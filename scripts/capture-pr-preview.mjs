import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
await mkdir('preview-screenshots', { recursive: true });
const browser = await chromium.launch({ headless:true });
try {
  for (const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);

    const coverMetrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      hasCover: Boolean(document.querySelector('.landing-cover')),
      sideRailCount: document.querySelectorAll('.side-rail').length,
      entryCount: document.querySelectorAll('.cover-entry').length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));
    console.log(device + ' cover metrics:', JSON.stringify(coverMetrics));
    const coverIdentity = await page.evaluate(() => ({
      ariaLabel: document.querySelector('.landing-cover')?.getAttribute('aria-label'),
      wordmark: document.querySelector('.cover-wordmark')?.textContent?.trim(),
      title: document.querySelector('#cover-title')?.textContent?.trim(),
      role: document.querySelector('.cover-role')?.textContent?.replace(/\s+/g, ' ').trim(),
      pageTitle: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    }));
    console.log(device + ' cover identity:', JSON.stringify(coverIdentity));
    if (coverIdentity.ariaLabel !== '茹雪个人作品集封面' || coverIdentity.wordmark !== 'ruxue' ||
        coverIdentity.title !== '茹雪的创作空间' || coverIdentity.role !== '编剧 · AI 影像创作者' ||
        !coverIdentity.pageTitle.startsWith('茹雪 ruxue') || !coverIdentity.description?.includes('茹雪')) {
      throw Error('Cover identity copy does not match the approved scheme A: ' + JSON.stringify(coverIdentity));
    }
    await page.screenshot({path:'preview-screenshots/'+device+'-cover-fold.png',fullPage:false,animations:'disabled'});
    if (!coverMetrics.hasCover || coverMetrics.sideRailCount !== 0 || coverMetrics.entryCount !== 4) {
      throw Error('Cover must be a separate entrance with four clickable creative entries');
    }
    if (coverMetrics.horizontalOverflow) throw Error('Cover has horizontal overflow: ' + JSON.stringify(coverMetrics));
    if (device === 'desktop' && coverMetrics.scrollHeight > coverMetrics.viewportHeight + 2) {
      throw Error('Desktop cover should fit the viewport: ' + JSON.stringify(coverMetrics));
    }

    await page.locator('[data-cover-action="home"]').click();
    await page.locator('.side-rail').waitFor({state:'visible'});
    const homeMetrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      workCards: document.querySelectorAll('.home-work-card').length,
      legacyHomeSections: document.querySelectorAll('.gateway, .featured').length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));
    console.log(device + ' home metrics:', JSON.stringify(homeMetrics));
    await page.screenshot({path:'preview-screenshots/'+device+'-home-fold.png',fullPage:false,animations:'disabled'});
    if (homeMetrics.workCards !== 2 || homeMetrics.legacyHomeSections !== 0) throw Error('Home must present two creative tracks without the stacked poster sections');
    if (device === 'desktop' && homeMetrics.scrollHeight > homeMetrics.viewportHeight + 2) {
      throw Error('Desktop home should fit the viewport without forced vertical scrolling: ' + JSON.stringify(homeMetrics));
    }
    if (homeMetrics.horizontalOverflow) throw Error('Home has horizontal overflow: ' + JSON.stringify(homeMetrics));
    const rail = await page.locator('.side-rail').boundingBox();
    const panel = await page.locator('.surface-stage').boundingBox();
    if (!rail || !panel) throw Error('Navigation or glass panel missing');
    if (device==='desktop' && rail.x+rail.width>=panel.x) throw Error('Desktop rail not on left');
    if (device==='mobile' && rail.y<=panel.y) throw Error('Mobile rail not at bottom');
    const surfaceStyle = await page.locator('.surface-stage').evaluate(el => {
      const style = getComputedStyle(el);
      return {borderWidth: style.borderTopWidth, radius: style.borderTopLeftRadius, overflowY: style.overflowY};
    });
    console.log(device + ' content surface:', JSON.stringify(surfaceStyle));
    if (parseFloat(surfaceStyle.borderWidth) > 0 || parseFloat(surfaceStyle.radius) > 0) throw Error('Unwanted large frame still wraps the home content');
    if (surfaceStyle.overflowY === 'hidden') throw Error('Home content is clipped by a fixed-height container');
    const clapper = page.locator('.home-film-doodle .doodle-trigger');
    await clapper.click();
    const snapAnimations = await page.locator('.home-film-doodle .doodle-film-clapper').evaluate(el => el.getAnimations().length);
    if (snapAnimations < 1) throw Error('Clapperboard SVG click animation did not start');
    await page.screenshot({path:'preview-screenshots/'+device+'-home.png',fullPage:true,animations:'disabled'});
    for (const section of ['scripts','films','journal','about']) {
      await page.locator('.rail-nav a[href="#'+section+'"]').click();
      await page.locator('#'+section).waitFor({state:'visible'});
      if (await page.locator('.rail-nav a[aria-current="page"]').getAttribute('href') !== '#'+section) throw Error('Active nav wrong');
      await page.screenshot({path:'preview-screenshots/'+device+'-'+section+'.png',fullPage:true,animations:'disabled'});
    }
    await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
    for (const section of ['scripts','films','journal','about']) {
      await page.locator('[data-cover-action="'+section+'"]').click();
      if (section === 'journal') {
        await page.locator('.cover-entry-journal .doodle-note.is-writing').waitFor({state:'visible'});
        const penMotion = await page.locator('.cover-entry-journal .doodle-note-pen animateMotion').count();
        if (penMotion !== 1) throw Error('Notebook pen SVG motion did not start');
        const motionDuration = await page.locator('.cover-entry-journal .doodle-note-pen animateMotion').getAttribute('dur');
        if (motionDuration !== '1.3s') throw Error('Notebook pen motion duration changed unexpectedly');
        await page.waitForTimeout(360);
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-journal-writing.png',fullPage:false});
        await page.locator('#journal').waitFor({state:'visible', timeout:4000});
      } else {
        await page.locator('#'+section).waitFor({state:'visible'});
      }
      if (await page.locator('.rail-nav a[aria-current="page"]').getAttribute('href') !== '#'+section) {
        throw Error('Cover entry did not open the matching workspace section: ' + section);
      }
      await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
    }
    await page.locator('[data-cover-action="home"]').click();
    await page.locator('.side-rail').waitFor({state:'visible'});
    if (device==='desktop') {
      await page.locator('.rail-nav a[href="#scripts"]').hover();
      await page.screenshot({path:'preview-screenshots/desktop-nav-hover.png',animations:'disabled'});
    }
    await page.close();
  }
} finally { await browser.close(); }

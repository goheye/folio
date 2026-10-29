import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
await mkdir('preview-screenshots', { recursive: true });
const browser = await chromium.launch({ headless:true });
try {
  for (const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
    await page.goto('http://127.0.0.1:4173', {waitUntil:'networkidle'});
    await page.evaluate(() => document.fonts.ready);
    const homeMetrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      workCards: document.querySelectorAll('.home-work-card').length,
      legacyHomeSections: document.querySelectorAll('.gateway, .featured').length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      boxes: ['.workspace-layout','.workspace-main','.site-header','.surface-stage','.site-main-home','.home-hero','.footer','.side-rail'].map(selector => {
        const element = document.querySelector(selector);
        if (!element) return {selector,missing:true};
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {selector,top:Math.round(rect.top),bottom:Math.round(rect.bottom),height:Math.round(rect.height),minHeight:style.minHeight,flex:style.flex};
      }),
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
    if (device==='desktop') {
      await page.locator('.rail-nav a[href="#home"]').click();
      await page.locator('.rail-nav a[href="#scripts"]').hover();
      await page.screenshot({path:'preview-screenshots/desktop-nav-hover.png',animations:'disabled'});
    }
    await page.close();
  }
} finally { await browser.close(); }
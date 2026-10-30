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
    const coverScriptImages = await page.locator('.cover-entry-script .cover-book-frame').evaluateAll(images =>
      images.map(img => ({
        src: img.getAttribute('src'), complete: img.complete,
        width: img.naturalWidth, height: img.naturalHeight
      }))
    );
    if (coverScriptImages.length !== 2 ||
        coverScriptImages[0].src !== '/icons/script-book-closed-original.png' ||
        coverScriptImages[1].src !== '/icons/script-book-open-original.png' ||
        coverScriptImages.some(img => !img.complete || img.width !== 1254 || img.height !== 1254)) {
      throw Error('Script icon must load both untouched 1254x1254 user PNG source images: '+JSON.stringify(coverScriptImages));
    }
    if (await page.locator('.cover-entry-script .doodle-script').count() !== 0) {
      throw Error('Script cover entry must not use a reconstructed SVG in place of the supplied PNG');
    }
    const profileImages = await page.locator('.cover-entry-profile .cover-profile-icon img').evaluateAll(images =>
      images.map(img => ({
        src: img.getAttribute('src'), complete: img.complete,
        width: img.naturalWidth, height: img.naturalHeight
      }))
    );
    if (profileImages.length !== 2 ||
        profileImages[0].src !== '/icons/about-profile-original.png' ||
        profileImages[1].src !== '/icons/about-eyes-closed-overlay.png' ||
        profileImages.some(img => !img.complete || img.width !== 1254 || img.height !== 1254) ||
        await page.locator('.cover-entry-profile .doodle-profile').count() !== 0) {
      throw Error('About icon must retain the exact 1254x1254 uploaded image with a separate blink overlay: ' +
        JSON.stringify(profileImages));
    }
    if (await page.locator('.cover-entry-profile .cover-profile-eyes').evaluate(el =>
      getComputedStyle(el).opacity !== '0')) {
      throw Error('Closed-eye overlay must be invisible before activation');
    }
    const coverFilmImages = await page.locator('.cover-entry-film .cover-film-part').evaluateAll(images =>
      images.map(img => ({
        src: img.getAttribute('src'), complete: img.complete,
        width: img.naturalWidth, height: img.naturalHeight
      }))
    );
    if (coverFilmImages.length !== 4 || coverFilmImages.some(img =>
      img.src !== '/icons/film-clapper-original.png' || !img.complete ||
      img.width !== 1254 || img.height !== 1254) ||
      await page.locator('.cover-entry-film .doodle-film').count() !== 0 ||
      await page.locator('.cover-entry-film .is-recording').count() !== 0) {
      throw Error('Film entry must start OPEN, using only layers from the untouched original PNG: ' +
        JSON.stringify(coverFilmImages));
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
    // The About rail icon must use the original cover artwork and the same white frame.
    const railProfile = await page.locator('.rail-nav a[href="#about"] .rail-profile-pad').evaluate(pad => ({
      images: [...pad.querySelectorAll('.cover-profile-icon img')].map(img => ({
        src: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0,
      })),
      background: getComputedStyle(pad).backgroundColor,
      width: Math.round(pad.getBoundingClientRect().width),
      height: Math.round(pad.getBoundingClientRect().height),
    }));
    const railIconSize = device === 'desktop' ? 40 : 34;
    if (railProfile.images.length !== 2 ||
        railProfile.images[0].src !== '/icons/about-profile-original.png' ||
        railProfile.images[1].src !== '/icons/about-eyes-closed-overlay.png' ||
        railProfile.images.some(img => !img.loaded) ||
        railProfile.background !== 'rgb(255, 255, 255)' ||
        railProfile.width !== railIconSize || railProfile.height !== railIconSize) {
      throw Error('About rail icon must match cover artwork and frame: '+JSON.stringify(railProfile));
    }
    const homeMetrics = await page.evaluate(() => ({
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
      showcase: document.querySelectorAll('.showcase-home').length,
      hasScriptPanel: Boolean(document.querySelector('[data-showcase-panel="script"]')),
      legacyHomeCards: document.querySelectorAll('.home-work-card, .gateway, .featured').length,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    }));
    console.log(device + ' home metrics:', JSON.stringify(homeMetrics));
    await page.screenshot({path:'preview-screenshots/'+device+'-home-fold.png',fullPage:false,animations:'disabled'});
    if (homeMetrics.showcase !== 1 || !homeMetrics.hasScriptPanel || homeMetrics.legacyHomeCards !== 0) throw Error('Home must show one representative-work showcase, not duplicate category cards');
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
    const scriptToggle = page.locator('[data-showcase-view="script"]');
    const filmToggle = page.locator('[data-showcase-view="film"]');
    if (await scriptToggle.getAttribute('aria-pressed') !== 'true' || await filmToggle.getAttribute('aria-pressed') !== 'false') {
      throw Error('Homepage showcase must initially present screenplay view');
    }
    await filmToggle.click();
    await page.locator('[data-showcase-panel="film"]').waitFor({state:'visible'});
    if (await filmToggle.getAttribute('aria-pressed') !== 'true' || await scriptToggle.getAttribute('aria-pressed') !== 'false' ||
        (await page.locator('.showcase-explore').innerText()).trim() !== '浏览影像作品' ||
        await page.locator('[data-showcase-panel="script"]').count() !== 0) {
      throw Error('Film switch must change the showcased perspective and detail link');
    }
    await page.screenshot({path:'preview-screenshots/'+device+'-home-film-view.png',fullPage:false,animations:'disabled'});
    await scriptToggle.click();
    await page.locator('[data-showcase-panel="script"]').waitFor({state:'visible'});
    if (await scriptToggle.getAttribute('aria-pressed') !== 'true' ||
        (await page.locator('.showcase-explore').innerText()).trim() !== '浏览剧本作品') {
      throw Error('Returning to screenplay perspective must restore default view');
    }
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
        const motion = await page.locator('.cover-entry-journal .doodle-note-pen animateMotion').evaluate(el => ({
          duration: el.getAttribute('dur'),
          calcMode: el.getAttribute('calcMode'),
          path: el.getAttribute('path') || '',
          keyTimes: (el.getAttribute('keyTimes') || '').split(';'),
          keyPoints: (el.getAttribute('keyPoints') || '').split(';'),
        }));
        if (motion.duration !== '1.7s' || motion.calcMode !== 'linear') {
          throw Error('Notebook pen motion timing is not the revised natural-writing sequence: ' + JSON.stringify(motion));
        }
        if (!motion.path.includes('Q108 99 147 92') ||
            !motion.path.includes('Q108 122 138 116') ||
            !motion.path.includes('Q119 146 155 139')) {
          throw Error('Notebook pen path no longer follows the three ink strokes: ' + motion.path);
        }
        if (motion.keyTimes.length !== 11 || motion.keyPoints.length !== 11 ||
            motion.keyPoints.filter((point, index, all) => index > 0 && point === all[index - 1]).length !== 3) {
          throw Error('Notebook pen needs a short lift/pause before each written line: ' + JSON.stringify(motion));
        }
        const lineTimings = await page.locator('.cover-entry-journal .doodle-note-line').evaluateAll(lines =>
          lines.map(line => {
            const style = getComputedStyle(line);
            return { name: style.animationName, duration: style.animationDuration, delay: style.animationDelay };
          })
        );
        if (lineTimings.length !== 3 || lineTimings.some(line => line.name !== 'note-line-write')) {
          throw Error('Notebook ink lines are not animated in sync with the pen: ' + JSON.stringify(lineTimings));
        }
        console.log(device + ' notebook line timings:', JSON.stringify(lineTimings));
        await page.waitForTimeout(960);
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-journal-writing-middle.png',fullPage:false});
        await page.waitForTimeout(220);
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-journal-writing-late.png',fullPage:false});
        await page.locator('#journal').waitFor({state:'visible', timeout:4000});
      } else if (section === 'scripts') {
        await page.locator('.cover-entry-script .cover-book-icon.is-turning').waitFor({state:'visible'});
        const animation = await page.locator('.cover-entry-script .cover-book-open').evaluate(el => ({
          count: el.getAnimations().length,
          name: getComputedStyle(el).animationName,
          duration: getComputedStyle(el).animationDuration,
        }));
        if (animation.count === 0 || animation.name !== 'cover-book-unfold' || animation.duration !== '1.05s') {
          throw Error('Script book opening animation did not begin: ' + JSON.stringify(animation));
        }
        await page.waitForTimeout(620);
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-script-page-turn.png',fullPage:false});
        await page.locator('#scripts').waitFor({state:'visible', timeout:4000});
      } else if (section === 'films') {
        const filmEntry = page.locator('.cover-entry-film [data-cover-action="films"]');
        const lid = page.locator('.cover-entry-film .cover-film-lid');
        const led = page.locator('.cover-entry-film .cover-film-led');
        await page.locator('.cover-entry-film .cover-film-icon.is-recording').waitFor({state:'visible'});
        if (await page.locator('.landing-cover').count() !== 1 ||
            !(await filmEntry.isDisabled()) ||
            !(await filmEntry.getAttribute('aria-label')).includes('自动进入')) {
          throw Error('A single film click must play the slate and REC sequence before navigating');
        }
        const recording = await led.evaluate(el => ({
          name: getComputedStyle(el).animationName,
          iterations: getComputedStyle(el).animationIterationCount,
          delay: getComputedStyle(el).animationDelay
        }));
        if (recording.name !== 'cover-film-rec-blink' || recording.iterations !== 'infinite' ||
            recording.delay !== '0.62s') {
          throw Error('REC red dot must blink repeatedly AFTER the slate closes: ' +
            JSON.stringify(recording));
        }
        await page.waitForTimeout(790);
        const closedSlate = await lid.evaluate(el => ({
          transform: getComputedStyle(el).transform,
          transitionDuration: getComputedStyle(el).transitionDuration,
          zIndex: Number(getComputedStyle(el).zIndex),
          bodyZ: Number(getComputedStyle(document.querySelector('.cover-film-body')).zIndex),
        }));
        if (closedSlate.transform === 'none' || closedSlate.zIndex <= closedSlate.bodyZ ||
            closedSlate.transitionDuration !== '0.62s') {
          throw Error('Upper slate must move fully ON TOP of the lower striped slate: ' +
            JSON.stringify(closedSlate));
        }
        if (await page.locator('.landing-cover').count() !== 1) {
          throw Error('Film sequence must remain on the cover long enough to see REC blink');
        }
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-film-closed-recording.png',fullPage:false});
        await page.waitForTimeout(620);
        if (await page.locator('.landing-cover').count() !== 1) {
          throw Error('Film sequence must show several REC pulses before auto-navigation');
        }
        // No second click: the same click navigates after the blinking interval.
        await page.locator('#films').waitFor({state:'visible', timeout:4000});
      } else if (section === 'about') {
        await page.locator('.cover-entry-profile .cover-profile-icon.is-blinking').waitFor({state:'visible'});
        const blink = await page.locator('.cover-entry-profile .cover-profile-eyes').evaluate(el => ({
          count: el.getAnimations().length,
          name: getComputedStyle(el).animationName,
          duration: getComputedStyle(el).animationDuration
        }));
        if (blink.count < 1 || blink.name !== 'cover-profile-double-blink' ||
            blink.duration !== '1.12s') {
          throw Error('About should start a two-blink overlay animation on first click: ' +
            JSON.stringify(blink));
        }
        await page.waitForTimeout(166);
        await page.screenshot({path:'preview-screenshots/'+device+'-cover-about-blink.png',fullPage:false});
        await page.locator('#about').waitFor({state:'visible',timeout:4000});
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
    const coverNav = page.locator('.rail-nav a[href="#cover"]');
    if (await coverNav.count() !== 1 || (await coverNav.innerText()).trim() !== '封面') {
      throw Error('Inner navigation must expose a single 封面 entry linking to #cover');
    }
    await coverNav.click();
    await page.locator('.landing-cover').waitFor({state:'visible'});
    if (await page.locator('.side-rail').count() !== 0 || new URL(page.url()).hash !== '#cover') {
      throw Error('The 封面 navigation entry must leave the workspace and return to the independent cover');
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

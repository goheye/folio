import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('preview-screenshots', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const [device,width,height] of [['desktop',1440,900],['mobile',390,844]]) {
    const page = await browser.newPage({ viewport:{width,height},deviceScaleFactor:1 });
    await page.goto('http://127.0.0.1:4173', { waitUntil:'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path:'preview-screenshots/'+device+'-home.png',fullPage:true,animations:'disabled' });
    for (const section of ['scripts','films','journal','about']) {
      await page.locator('.site-header .menu-toggle').evaluate(el => {
        if (getComputedStyle(el).display !== 'none') el.click();
      });
      await page.locator('#primary-nav a[href="#'+section+'"]').click();
      await page.locator('#'+section).waitFor({state:'visible'});
      await page.screenshot({path:'preview-screenshots/'+device+'-'+section+'.png',fullPage:true,animations:'disabled'});
    }
    await page.close();
  }
} finally { await browser.close(); }

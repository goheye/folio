import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseUrl = 'http://127.0.0.1:4173';
const output = 'preview-screenshots';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const [device, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: output + '/' + device + '-home.png', fullPage: true, animations: 'disabled' });
    await page.locator('#scripts').scrollIntoViewIfNeeded();
    await page.screenshot({ path: output + '/' + device + '-scripts.png', fullPage: false, animations: 'disabled' });
    await page.locator('#films').scrollIntoViewIfNeeded();
    await page.screenshot({ path: output + '/' + device + '-films.png', fullPage: false, animations: 'disabled' });
    await page.close();
  }
} finally { await browser.close(); }
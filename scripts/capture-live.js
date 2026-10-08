import { chromium } from '@playwright/test';
import path from 'path';

async function capture() {
  const artifactDir = 'C:\\Users\\santh\\.gemini\\antigravity-ide\\brain\\ddd28a3c-e48d-4041-867e-5232c640689c';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('Navigating to live site...');
  await page.goto('https://agnex-technology.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  console.log('Capturing hero...');
  await page.screenshot({ path: path.join(artifactDir, 'hero_live.png'), fullPage: false });

  console.log('Capturing full page...');
  await page.screenshot({ path: path.join(artifactDir, 'fullpage_live.png'), fullPage: true });

  await browser.close();
  console.log('Done!');
}

capture().catch(err => {
  console.error('Snapshot error:', err.message);
  process.exit(1);
});

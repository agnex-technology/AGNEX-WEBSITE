import { chromium } from '@playwright/test';
import path from 'path';

async function capture() {
  const artifactDir = 'C:\\Users\\santh\\.gemini\\antigravity-ide\\brain\\ddd28a3c-e48d-4041-867e-5232c640689c';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  const pagesToCapture = [
    { name: 'home_live.png', url: 'https://agnex-technology.vercel.app/' },
    { name: 'work_live.png', url: 'https://agnex-technology.vercel.app/work' },
    { name: 'casestudy_rda_live.png', url: 'https://agnex-technology.vercel.app/work/rda' },
    { name: 'expertise_live.png', url: 'https://agnex-technology.vercel.app/expertise' },
    { name: 'company_live.png', url: 'https://agnex-technology.vercel.app/company' },
    { name: 'contact_live.png', url: 'https://agnex-technology.vercel.app/contact' }
  ];

  for (const item of pagesToCapture) {
    console.log(`Navigating to ${item.url}...`);
    await page.goto(item.url, { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(1500);
    console.log(`Capturing ${item.name}...`);
    await page.screenshot({ path: path.join(artifactDir, item.name), fullPage: false });
  }

  await browser.close();
  console.log('All live snapshots captured successfully!');
}

capture().catch(err => {
  console.error('Snapshot error:', err.message);
  process.exit(1);
});

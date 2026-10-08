import { chromium } from '@playwright/test';
import path from 'path';

async function capture() {
  const artifactDir = 'C:\\Users\\santh\\.gemini\\antigravity-ide\\brain\\ddd28a3c-e48d-4041-867e-5232c640689c';
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const desktopContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopContext.newPage();
  
  const desktopPages = [
    { name: 'home_live.png', url: 'https://agnex-technology.vercel.app/' },
    { name: 'services_live.png', url: 'https://agnex-technology.vercel.app/services' },
    { name: 'service_web_live.png', url: 'https://agnex-technology.vercel.app/services/web-development' },
    { name: 'solutions_live.png', url: 'https://agnex-technology.vercel.app/solutions' },
    { name: 'industries_live.png', url: 'https://agnex-technology.vercel.app/industries' },
    { name: 'projects_live.png', url: 'https://agnex-technology.vercel.app/projects' }
  ];

  for (const item of desktopPages) {
    console.log(`Navigating desktop to ${item.url}...`);
    try {
      await desktopPage.goto(item.url, { waitUntil: 'networkidle', timeout: 35000 });
      await desktopPage.waitForTimeout(1000);
      console.log(`Capturing ${item.name}...`);
      await desktopPage.screenshot({ path: path.join(artifactDir, item.name), fullPage: false });
    } catch (e) {
      console.error(`Failed ${item.name}:`, e.message);
    }
  }

  // Mobile
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();
  console.log('Navigating mobile to https://agnex-technology.vercel.app/...');
  try {
    await mobilePage.goto('https://agnex-technology.vercel.app/', { waitUntil: 'networkidle', timeout: 35000 });
    await mobilePage.waitForTimeout(1000);
    console.log('Capturing mobile_home_live.png...');
    await mobilePage.screenshot({ path: path.join(artifactDir, 'mobile_home_live.png'), fullPage: false });
  } catch (e) {
    console.error('Failed mobile capture:', e.message);
  }

  await browser.close();
  console.log('Finished capturing all snapshots!');
}

capture().catch(err => {
  console.error('Snapshot execution error:', err.message);
  process.exit(1);
});

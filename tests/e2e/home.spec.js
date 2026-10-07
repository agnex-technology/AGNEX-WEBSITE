import { test, expect } from '@playwright/test';

test.describe('AGNEX Technology Platform Homepage', () => {
  test('loads homepage and displays official branding and headline', async ({ page }) => {
    await page.goto('/');

    // Verify page title adheres to enterprise SEO format
    await expect(page).toHaveTitle(/AGNEX Technology/);

    // Verify master hero headline is present
    const headline = page.locator('h1');
    await expect(headline).toContainText("Engineering What's Next.");

    // Verify official brand promise
    await expect(page.locator('text=Ideas, engineered into impact.').first()).toBeVisible();

    // Verify primary CTA button is present with correct link target
    const startProjectBtn = page.locator('#hero-start-project');
    await expect(startProjectBtn).toBeVisible();
    await expect(startProjectBtn).toHaveAttribute('href', '/contact');
  });

  test('hero navigation CTA transitions to expertise route', async ({ page }) => {
    page.on('pageerror', err => console.log('[Browser Error]', err.message));
    page.on('console', msg => console.log('[Browser Console]', msg.text()));
    await page.goto('/');

    // Locate and click secondary hero CTA
    const exploreBtn = page.locator('#hero-explore-expertise');
    await expect(exploreBtn).toBeVisible();
    await exploreBtn.click();

    // Verify URL change and target route rendering
    await expect(page).toHaveURL(/.*expertise/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering Capabilities', { timeout: 10000 });
  });
});

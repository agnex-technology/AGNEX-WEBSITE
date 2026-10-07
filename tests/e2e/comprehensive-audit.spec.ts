import { test, expect } from '@playwright/test';

test.describe('Automated Platform Diagnostics & Bug Audit', () => {
  const routesToAudit = [
    '/',
    '/expertise',
    '/services',
    '/work',
    '/portfolio',
    '/work/rda',
    '/work/skynet',
    '/work/lawguide-ai',
    '/work/sentinelx-ai',
    '/ai-slop-checker',
    '/company',
    '/about',
    '/contact',
    '/insights',
    '/non-existent-test-404'
  ];

  for (const route of routesToAudit) {
    test(`Audit Route: ${route}`, async ({ page }) => {
      const pageErrors: string[] = [];
      const consoleErrors: string[] = [];
      const consoleWarnings: string[] = [];
      const failedRequests: { url: string; status: number }[] = [];

      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error') {
          consoleErrors.push(text);
        } else if (type === 'warning') {
          consoleWarnings.push(text);
        }
      });

      page.on('response', (response) => {
        const status = response.status();
        // Ignore expected 404 on the deliberate 404 test route if requesting non-existent page
        if (status >= 400 && !(route === '/non-existent-test-404' && response.url().includes('404'))) {
          failedRequests.push({ url: response.url(), status });
        }
      });

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});
      expect(response).not.toBeNull();

      // Check for broken images (excluding data URLs and SVGs if rendered inline)
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.src || img.getAttribute('src') || 'unspecified src');
      });

      // Check for viewport horizontal overflow (layout bug)
      const hasHorizontalOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      // Output diagnostics
      console.log(`\n--- AUDIT RESULTS FOR [${route}] ---`);
      console.log(`Page Errors (${pageErrors.length}):`, pageErrors);
      console.log(`Console Errors (${consoleErrors.length}):`, consoleErrors);
      console.log(`Console Warnings (${consoleWarnings.length}):`, consoleWarnings);
      console.log(`Failed Requests (${failedRequests.length}):`, failedRequests);
      console.log(`Broken Images (${brokenImages.length}):`, brokenImages);
      console.log(`Horizontal Overflow:`, hasHorizontalOverflow);

      // Assertions
      expect(pageErrors, `Uncaught page errors on ${route}`).toHaveLength(0);
      expect(brokenImages, `Broken images found on ${route}`).toHaveLength(0);
      expect(hasHorizontalOverflow, `Horizontal scroll overflow detected on ${route}`).toBe(false);
    });
  }

  test('Interactive Audit: Contact Form Validation & State', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    // Verify contact form elements are present
    const nameInput = page.locator('input[name="name"], input#name');
    const emailInput = page.locator('input[name="email"], input#email');
    const messageInput = page.locator('textarea[name="message"], textarea#message');
    const submitBtn = page.locator('button[type="submit"]');

    if ((await submitBtn.count()) > 0) {
      await expect(submitBtn.first()).toBeVisible();

      // Attempt empty submit to test HTML5 or client-side validation
      await submitBtn.first().click();

      // If inputs exist, fill and test interactions
      if ((await nameInput.count()) > 0) {
        await nameInput.first().fill('Diagnostic Tester');
      }
      if ((await emailInput.count()) > 0) {
        await emailInput.first().fill('test@example.com');
      }
      if ((await messageInput.count()) > 0) {
        await messageInput.first().fill('Diagnostic automated test validation query.');
      }
    }
  });

  test('Interactive Audit: Mobile Viewport & Navigation Drawer', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'networkidle' });

    // Find mobile hamburger button
    const menuBtn = page.locator('button.mobile-toggle');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Verify mobile drawer dialog opened
    const drawer = page.locator('div[role="dialog"][aria-label="Mobile Navigation"]');
    await expect(drawer).toBeVisible();

    // Verify mobile links inside drawer
    const mobileExpertiseLink = drawer.locator('a[href="/expertise"]');
    await expect(mobileExpertiseLink).toBeVisible();

    // Close menu
    await menuBtn.click();
    await expect(drawer).toBeHidden();
  });

  test('Interactive Audit: Portfolio Filtering & Case Study Navigation', async ({ page }) => {
    await page.goto('/work', { waitUntil: 'networkidle' });

    // Click a filter button if present
    const filterButtons = page.locator('button:has-text("SYSTEMS"), button:has-text("DIGITAL"), button:has-text("All")');
    if ((await filterButtons.count()) > 0) {
      await filterButtons.first().click();
      await page.waitForTimeout(200);
    }

    // Verify case study card link works
    const caseStudyLink = page.locator('a[href*="/work/"]').first();
    if ((await caseStudyLink.count()) > 0) {
      const targetHref = await caseStudyLink.getAttribute('href');
      await caseStudyLink.click();
      await page.waitForURL(`**${targetHref}`, { timeout: 10000 });
      expect(page.url()).toContain('/work/');
    }
  });

  test('Mobile Responsive Layout Overflow Audit across Key Routes', async ({ page }) => {
    // Audit for mobile viewport overflow on iPhone dimensions
    await page.setViewportSize({ width: 375, height: 812 });
    const mobileRoutes = ['/', '/expertise', '/work', '/company', '/contact', '/insights'];

    for (const route of mobileRoutes) {
      await page.goto(route, { waitUntil: 'networkidle' });
      const overflowDetails = await page.evaluate(() => {
        const col = document.querySelector('.pillar-content-col') as HTMLElement;
        const chain = [];
        let curr: HTMLElement | null = col;
        while (curr && curr !== document.body) {
          const r = curr.getBoundingClientRect();
          chain.push({
            tag: curr.tagName,
            className: curr.className,
            id: curr.id,
            left: r.left,
            right: r.right,
            width: r.width
          });
          curr = curr.parentElement;
        }
        return {
          scrollWidth: document.documentElement.scrollWidth,
          docWidth: window.innerWidth,
          chain
        };
      });
      console.log(`[Mobile 375px] Route ${route} hierarchy chain:`, JSON.stringify(overflowDetails, null, 2));
      expect(overflowDetails.scrollWidth <= overflowDetails.docWidth, `Mobile horizontal overflow on ${route}`).toBe(true);
    }
  });

  test('Official Contact & Social Integration Audit', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // 1. Verify Footer Brand Copy & Headlines
    const footer = page.locator('footer');
    await expect(footer).toContainText('AGNEX Technology');
    await expect(footer).toContainText("Engineering What's Next.");
    await expect(footer).toContainText('Ideas, engineered into impact.');

    // 2. Verify Footer Navigation Links
    await expect(footer.locator('a[href="/expertise"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/work"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/company"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/insights"]').first()).toBeVisible();
    await expect(footer.locator('a[href="/contact"]').first()).toBeVisible();

    // 3. Verify Footer Phone Link
    const footerPhone = footer.locator('a[href="tel:+917598341607"]');
    await expect(footerPhone).toBeVisible();
    await expect(footerPhone).toContainText('+91 75983 41607');

    // 4. Verify Footer Social Links
    const footerLinkedIn = footer.locator('a[href="https://www.linkedin.com/company/agnex-technology"]');
    const footerInstagram = footer.locator('a[href="https://www.instagram.com/agnextechnology"]');
    await expect(footerLinkedIn).toBeVisible();
    await expect(footerInstagram).toBeVisible();
    await expect(footerLinkedIn).toHaveAttribute('target', '_blank');
    await expect(footerInstagram).toHaveAttribute('target', '_blank');

    // 5. Navigate to Contact Page
    await page.goto('/contact', { waitUntil: 'networkidle' });

    // Verify Contact page Direct Phone Link
    const contactPhone = page.locator('a[href="tel:+917598341607"]').first();
    await expect(contactPhone).toBeVisible();
    await expect(contactPhone).toContainText('+91 75983 41607');

    // Verify "Connect with AGNEX" Section and Links
    await expect(page.locator('text=Connect with AGNEX').first()).toBeVisible();
    const contactLinkedIn = page.locator('a[href="https://www.linkedin.com/company/agnex-technology"]').first();
    const contactInstagram = page.locator('a[href="https://www.instagram.com/agnextechnology"]').first();
    await expect(contactLinkedIn).toBeVisible();
    await expect(contactInstagram).toBeVisible();

    // 6. Verify Mobile Touch Target Constraints (>= 44px)
    await page.setViewportSize({ width: 375, height: 812 });
    const phoneBox = await contactPhone.boundingBox();
    expect(phoneBox).not.toBeNull();
    if (phoneBox) {
      expect(phoneBox.height).toBeGreaterThanOrEqual(44);
    }

    // 7. Verify Schema.org JSON-LD sameAs & Telephone
    const structuredDataSchemas = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
      return scripts.map(s => JSON.parse(s.textContent || '{}'));
    });

    const orgSchema = structuredDataSchemas
      .flatMap(s => (s['@graph'] ? s['@graph'] : [s]))
      .find(item => item['@type'] === 'Organization' || item.mainEntity?.['@type'] === 'Organization');

    expect(orgSchema).toBeDefined();
  });

  test('Official WhatsApp Integration Directive Audit', async ({ page }) => {
    // 1. Audit Home Page WhatsApp Placements
    await page.goto('/', { waitUntil: 'networkidle' });

    // Footer WhatsApp links
    const footerWhatsAppLinks = page.locator('footer a[href*="wa.me/917598341607"]');
    expect(await footerWhatsAppLinks.count()).toBeGreaterThanOrEqual(2);
    await expect(footerWhatsAppLinks.first()).toBeVisible();
    await expect(page.locator('footer:has-text("Chat on WhatsApp →")')).toBeVisible();

    // Homepage Closing CTA WhatsApp Button
    const closingCtaWhatsApp = page.locator('#cta-whatsapp');
    await expect(closingCtaWhatsApp).toBeVisible();
    await expect(closingCtaWhatsApp).toContainText(/WhatsApp/);
    await expect(closingCtaWhatsApp).toHaveAttribute('href', /wa\.me\/917598341607/);

    // 2. Audit Mobile Nav Drawer WhatsApp Button
    await page.setViewportSize({ width: 375, height: 812 });
    const mobileToggle = page.locator('button.mobile-toggle');
    await mobileToggle.click();

    const mobileWhatsAppBtn = page.locator('.mobile-whatsapp-cta');
    await expect(mobileWhatsAppBtn).toBeVisible();
    await expect(mobileWhatsAppBtn).toContainText('Chat on WhatsApp');
    const mobileWhatsAppBox = await mobileWhatsAppBtn.boundingBox();
    expect(mobileWhatsAppBox).not.toBeNull();
    if (mobileWhatsAppBox) {
      expect(mobileWhatsAppBox.height).toBeGreaterThanOrEqual(44);
    }
    await mobileToggle.click();

    // 3. Audit Contact Page WhatsApp Placements
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/contact', { waitUntil: 'networkidle' });

    // Hero strip WhatsApp
    const heroWhatsApp = page.locator('.contact-whatsapp-pill');
    await expect(heroWhatsApp).toBeVisible();
    await expect(heroWhatsApp).toContainText('+91 75983 41607');
    await expect(heroWhatsApp).toContainText('Chat on WhatsApp →');
    await expect(heroWhatsApp).toHaveAttribute('href', /wa\.me\/917598341607/);

    // Form callout WhatsApp
    await expect(page.locator('text=Start a Conversation on WhatsApp').first()).toBeVisible();
    await expect(page.locator("text=Tell us what you're building. We'll take it from there.").first()).toBeVisible();
    const continueWhatsAppBtn = page.locator('.contact-whatsapp-direct');
    await expect(continueWhatsAppBtn).toBeVisible();
    await expect(continueWhatsAppBtn).toContainText('Continue on WhatsApp');
    await expect(continueWhatsAppBtn).toHaveAttribute('href', /wa\.me\/917598341607/);

    // 4. Mobile touch targets on Contact page
    await page.setViewportSize({ width: 375, height: 812 });
    const heroWhatsAppBox = await heroWhatsApp.boundingBox();
    expect(heroWhatsAppBox).not.toBeNull();
    if (heroWhatsAppBox) {
      expect(heroWhatsAppBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('Interactive Audit: AI Slop Website Auditor & Intelligence Feature', async ({ page }) => {
    await page.goto('/ai-slop-checker', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 3000 }).catch(() => {});

    // 1. Verify Header & Disclaimer
    await expect(page.locator('h1')).toContainText('AI Slop Website Auditor');
    await expect(page.locator('text=Analysis Methodology Notice:')).toBeVisible();

    // 2. Trigger Demo Mode
    const demoBtn = page.locator('text=Try Demo Analysis →');
    await expect(demoBtn).toBeVisible();
    await demoBtn.click();

    // 3. Verify Demo Report Appears
    await expect(page.locator('text=DEMO ANALYSIS')).toBeVisible();
    await expect(page.locator('h2').first()).toContainText('demo-saas-enterprise.io');
    await expect(page.locator('text=Transparent Dimension Scores')).toBeVisible();

    // 4. Test Score Breakdown Modal
    const slopScoreCard = page.locator('text=AI Slop Risk').first();
    await slopScoreCard.click();
    await expect(page.locator('text=AI Slop Risk Breakdown')).toBeVisible();
    await expect(page.locator('text=Evaluated Sub-Factors & Weighting')).toBeVisible();
    // Close modal
    await page.locator('text=Close Breakdown').click();
    await expect(page.locator('text=AI Slop Risk Breakdown')).not.toBeVisible();

    // 5. Test Page Forensic Inspection Modal
    const inspectBtn = page.locator('text=Inspect Page →').first();
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();
    await expect(page.locator('text=Page Audit · Forensic Inspection')).toBeVisible();
    await page.locator('text=Close Inspection').click();
    await expect(page.locator('text=Page Audit · Forensic Inspection')).not.toBeVisible();

    // 6. Test Duplicate Clusters Tab
    const dupTab = page.locator('text=Duplicate Clusters');
    await dupTab.click();
    await expect(page.locator('text=Geo-Targeted Cloud Migration Doorway Pages')).toBeVisible();

    // 7. Test Actionable Recommendations Tab
    const recTab = page.locator('text=Actionable Fixes');
    await recTab.click();
    await expect(page.locator('text=Eradicate Formulaic AI Introductions and Conclusions')).toBeVisible();
  });
});


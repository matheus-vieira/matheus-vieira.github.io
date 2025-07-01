import { test, expect } from '@playwright/test';

test.describe('Full Site Integration', () => {
  test('complete user journey - visitor exploring the site', async ({ page }) => {
    // Start at home page
    await page.goto('/');
    await expect(page).toHaveTitle(/Matheus Costa Vieira/);
    
    // Navigate to about page
    const aboutLink = page.locator('a[href*="about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await expect(page).toHaveURL(/.*about.*/);
      await expect(page.locator('body')).toContainText(/story|about|journey/i);
    }
    
    // Navigate to resume
    await page.goto('/');
    const resumeLink = page.locator('a[href*="resume"]').first();
    if (await resumeLink.isVisible()) {
      await resumeLink.click();
      await expect(page).toHaveURL(/.*resume.*/);
      await expect(page.locator('body')).toContainText(/experience|skills|engineer/i);
    }
    
    // Navigate to contact
    await page.goto('/');
    const contactLink = page.locator('a[href*="contact"]').first();
    if (await contactLink.isVisible()) {
      await contactLink.click();
      await expect(page).toHaveURL(/.*contact.*/);
      await expect(page.locator('form#contact')).toBeVisible();
    }
    
    // Test contact form interaction
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="_subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message content');
    
    // Verify form is properly filled
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('input[name="_subject"]')).toHaveValue('Test Subject');
    await expect(page.locator('textarea[name="message"]')).toHaveValue('Test message content');
  });

  test('responsive design integration', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop Large' },
      { width: 1366, height: 768, name: 'Desktop Standard' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];

    const testPages = ['/', '/about/', '/contact/', '/resume/'];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      for (const testPage of testPages) {
        await page.goto(testPage);
        
        // Check basic functionality at this viewport
        await expect(page.locator('body')).toBeVisible();
        
        // Check that content doesn't overflow
        const bodyBox = await page.locator('body').boundingBox();
        if (bodyBox) {
          expect(bodyBox.width).toBeLessThanOrEqual(viewport.width + 50);
        }
        
        // Check navigation is accessible
        const navElements = page.locator('nav, .navbar, .navigation, header');
        if (await navElements.count() > 0) {
          await expect(navElements.first()).toBeVisible();
        }
      }
    }
  });

  test('external link integration', async ({ page, context }) => {
    await page.goto('/');
    
    // Find external links (social media, etc.)
    const externalLinks = page.locator('a[href^="http"]:not([href*="matheus-vieira.github.io"]):not([href*="localhost"])');
    const linkCount = await externalLinks.count();
    
    if (linkCount > 0) {
      // Test first external link opens in new tab/window
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        externalLinks.first().click()
      ]);
      
      // Verify new page opened
      expect(newPage).toBeTruthy();
      
      // Close the new page
      await newPage.close();
    }
  });

  test('form submission integration', async ({ page }) => {
    await page.goto('/contact/');
    
    // Fill out the contact form
    await page.fill('input[name="email"]', 'integration.test@example.com');
    await page.fill('input[name="_subject"]', 'Integration Test Message');
    await page.fill('textarea[name="message"]', 'This is a test message from the integration test suite.');
    
    // Note: We won't actually submit to avoid sending test emails
    // Instead, we'll verify the form is ready for submission
    const form = page.locator('form#contact');
    
    // Check form action and method
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('action', /formsubmit\.co/);
    
    // Verify all required fields are filled and valid
    const emailValid = await page.locator('input[name="email"]').evaluate(el => el.checkValidity());
    const subjectValid = await page.locator('input[name="_subject"]').evaluate(el => el.checkValidity());
    const messageValid = await page.locator('textarea[name="message"]').evaluate(el => el.checkValidity());
    
    expect(emailValid).toBe(true);
    expect(subjectValid).toBe(true);
    expect(messageValid).toBe(true);
  });

  test('search engine optimization integration', async ({ page }) => {
    const testPages = ['/', '/about/', '/contact/', '/resume/', '/blog/'];
    
    for (const testPage of testPages) {
      await page.goto(testPage);
      
      // Check title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
      
      // Check meta description
      const metaDescription = page.locator('meta[name="description"]');
      if (await metaDescription.count() > 0) {
        const description = await metaDescription.getAttribute('content');
        expect(description).toBeTruthy();
        expect(description.length).toBeGreaterThan(0);
      }
      
      // Check canonical URL if present
      const canonical = page.locator('link[rel="canonical"]');
      if (await canonical.count() > 0) {
        const href = await canonical.getAttribute('href');
        expect(href).toBeTruthy();
      }
      
      // Check structured data if present
      const jsonLd = page.locator('script[type="application/ld+json"]');
      if (await jsonLd.count() > 0) {
        const content = await jsonLd.textContent();
        expect(content).toBeTruthy();
        
        // Verify it's valid JSON
        try {
          JSON.parse(content);
        } catch (e) {
          throw new Error(`Invalid JSON-LD on ${testPage}: ${e.message}`);
        }
      }
    }
  });

  test('performance integration', async ({ page }) => {
    // Test page load performance
    await page.goto('/');
    
    // Measure page load time
    const performanceEntries = await page.evaluate(() => {
      return performance.getEntriesByType('navigation')[0];
    });
    
    // Basic performance checks
    expect(performanceEntries.domContentLoadedEventEnd).toBeGreaterThan(0);
    expect(performanceEntries.loadEventEnd).toBeGreaterThan(0);
    
    // Check that page loads in reasonable time (5 seconds)
    const loadTime = performanceEntries.loadEventEnd - performanceEntries.fetchStart;
    expect(loadTime).toBeLessThan(5000);
  });
});

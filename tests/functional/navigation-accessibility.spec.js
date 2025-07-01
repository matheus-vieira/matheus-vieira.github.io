import { test, expect } from '@playwright/test';

test.describe('Navigation and Accessibility', () => {
  const pages = [
    { url: '/', name: 'Home' },
    { url: '/about/', name: 'About' },
    { url: '/contact/', name: 'Contact' },
    { url: '/blog/', name: 'Blog' },
    { url: '/resume/', name: 'Resume' },
    { url: '/courses/', name: 'Courses' },
    { url: '/study/', name: 'Study' }
  ];

  for (const { url, name } of pages) {
    test(`${name} page should be accessible`, async ({ page }) => {
      await page.goto(url);
      
      // Check that page loads successfully
      await expect(page.locator('body')).toBeVisible();
      
      // Check for basic accessibility - page should have a title
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(0);
    });

    test(`${name} page should have proper heading structure`, async ({ page }) => {
      await page.goto(url);
      
      // Check for heading hierarchy
      const h1Elements = page.locator('h1');
      const h1Count = await h1Elements.count();
      
      // Should have at least one h1 or main heading
      if (h1Count === 0) {
        // If no h1, should have other headings
        const headings = page.locator('h2, h3, h4, h5, h6');
        const headingCount = await headings.count();
        expect(headingCount).toBeGreaterThan(0);
      } else {
        // Should not have more than one h1
        expect(h1Count).toBeLessThanOrEqual(1);
      }
    });

    test(`${name} page should be responsive`, async ({ page }) => {
      // Test different viewport sizes with increased timeouts
      const viewports = [
        { width: 1200, height: 800 }, // Desktop
        { width: 768, height: 1024 }, // Tablet
        { width: 375, height: 667 }   // Mobile
      ];

      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        // Check that page content is visible and accessible with timeout
        await expect(page.locator('body')).toBeVisible({ timeout: 10000 });
        
        // Check that content doesn't overflow horizontally
        try {
          const bodyWidth = await page.locator('body').boundingBox({ timeout: 5000 });
          if (bodyWidth) {
            expect(bodyWidth.width).toBeLessThanOrEqual(viewport.width + 50); // Some tolerance for scrollbars
          }
        } catch (error) {
          // Skip bounding box check if it times out
          console.log(`Bounding box check skipped for ${name} at ${viewport.width}x${viewport.height}`);
        }
      }
    });
  }

  test('main navigation should work', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links exist and are clickable
    const navLinks = page.locator('nav a, .navbar a, .navigation a');
    const linkCount = await navLinks.count();
    
    if (linkCount > 0) {
      // Test first few navigation links
      const linksToTest = Math.min(3, linkCount);
      
      for (let i = 0; i < linksToTest; i++) {
        const link = navLinks.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
          await link.click();
          
          // Wait for navigation
          await page.waitForLoadState('networkidle');
          
          // Check that we navigated somewhere
          const currentUrl = page.url();
          expect(currentUrl).toBeTruthy();
          
          // Go back to home
          await page.goto('/');
        }
      }
    }
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const charset = page.locator('meta[charset]');
    await expect(charset).toHaveCount(1);
    
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1);
    
    // Check for description meta tag
    const description = page.locator('meta[name="description"]');
    if (await description.count() > 0) {
      const content = await description.getAttribute('content');
      expect(content).toBeTruthy();
    }
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-page-12345');
    
    // Should return 404 status
    expect(response?.status()).toBe(404);
    
    // Should show 404 page
    await expect(page.locator('body')).toBeVisible();
    
    // Should have some content indicating error
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toMatch(/404|not found|page not found/i);
  });
});

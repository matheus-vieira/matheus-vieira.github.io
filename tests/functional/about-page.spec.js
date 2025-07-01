import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should load about page successfully', async ({ page }) => {
    await page.goto('/about/');
    
    // Check page title
    await expect(page).toHaveTitle(/Matheus Costa Vieira/);
    
    // Check main heading contains journey information
    await expect(page.locator('h1.post-title').first()).toContainText(/journey/);
  });

  test('should contain personal information', async ({ page }) => {
    await page.goto('/about/');
    
    // Check for personal information
    await expect(page.locator('body')).toContainText('Porto Alegre');
    await expect(page.locator('body')).toContainText('Curitiba');
    await expect(page.locator('body')).toContainText('Fazenda Rio Grande');
  });

  test('should mention family information', async ({ page }) => {
    await page.goto('/about/');
    
    // Check for family mentions
    await expect(page.locator('body')).toContainText('Daniela');
    await expect(page.locator('body')).toContainText('Pedro Henrique');
    await expect(page.locator('body')).toContainText('family');
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/about/');
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/about/');
    
    // Check that page loads and main content is visible
    await expect(page.locator('body')).toBeVisible();
    
    // Check that text is readable (not overflowing)
    const mainContent = page.locator('main, article, .content, body');
    await expect(mainContent.first()).toBeVisible();
  });

  test('should have proper meta description', async ({ page }) => {
    await page.goto('/about/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content');
  });
});

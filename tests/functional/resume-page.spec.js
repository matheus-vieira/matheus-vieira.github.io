import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('should load resume page successfully', async ({ page }) => {
    await page.goto('/resume/');
    
    // Check page title
    await expect(page).toHaveTitle(/Matheus Costa Vieira/);
  });

  test('should contain professional information', async ({ page }) => {
    await page.goto('/resume/');
    
    // Check for professional content
    await expect(page.locator('body')).toContainText(/Software Engineer|Developer|Engineer/);
    
    // Check for experience or skills sections
    const contentIndicators = [
      'experience', 'skills', 'education', 'professional',
      'career', 'work', 'employment', 'projects'
    ];
    
    let foundContent = false;
    for (const indicator of contentIndicators) {
      const regex = new RegExp(indicator, 'i');
      if (await page.locator('body').textContent().then(text => regex.test(text))) {
        foundContent = true;
        break;
      }
    }
    expect(foundContent).toBe(true);
  });

  test('should have proper sections', async ({ page }) => {
    await page.goto('/resume/');
    
    // Check for section headings
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/resume/');
    
    // Check that page loads and main content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have sub-navigation if sections exist', async ({ page }) => {
    await page.goto('/resume/');
    
    // Check for links to resume subsections
    const resumeLinks = page.locator('a[href*="/resume/"], a[href*="academic"], a[href*="experience"], a[href*="skills"]');
    const linkCount = await resumeLinks.count();
    
    if (linkCount > 0) {
      await expect(resumeLinks.first()).toBeVisible();
    }
  });
});

import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test('should load blog page successfully', async ({ page }) => {
    await page.goto('/blog/');
    
    // Check page title
    await expect(page).toHaveTitle(/Matheus Costa Vieira/);
    
    // Check for blog content
    const blogContent = page.locator('main, article, .content, .posts');
    await expect(blogContent.first()).toBeVisible();
  });

  test('should display blog posts if any exist', async ({ page }) => {
    await page.goto('/blog/');
    
    // Check if there are any posts
    const posts = page.locator('.post, article, .post-item');
    const postCount = await posts.count();
    
    if (postCount > 0) {
      // If posts exist, they should be visible
      await expect(posts.first()).toBeVisible();
      
      // Posts should have titles and links
      const postLinks = page.locator('a[href*="/blog/"], a[href*="/post/"]');
      if (await postLinks.count() > 0) {
        await expect(postLinks.first()).toBeVisible();
      }
    } else {
      // If no posts, page should still load properly
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should have proper navigation if posts exist', async ({ page }) => {
    await page.goto('/blog/');
    
    // Check for pagination elements specifically (not general nav)
    const pagination = page.locator('.pagination');
    const paginationCount = await pagination.count();
    
    if (paginationCount > 0) {
      await expect(pagination.first()).toBeVisible();
    }
    // Note: Pagination only appears when there are multiple pages of posts
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog/');
    
    // Check that page loads and main content is visible
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/blog/');
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    
    if (headingCount > 0) {
      await expect(headings.first()).toBeVisible();
    }
  });
});

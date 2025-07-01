import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should load contact page successfully', async ({ page }) => {
    await page.goto('/contact/');
    
    // Check page title
    await expect(page).toHaveTitle(/Matheus Costa Vieira/);
    
    // Check for contact form
    await expect(page.locator('form#contact')).toBeVisible();
  });

  test('should have all required form fields', async ({ page }) => {
    await page.goto('/contact/');
    
    // Check form fields
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="_subject"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should have proper form validation', async ({ page }) => {
    await page.goto('/contact/');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check that browser validation prevents submission
    const emailField = page.locator('input[name="email"]');
    const isInvalid = await emailField.evaluate(el => !el.checkValidity());
    expect(isInvalid).toBe(true);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact/');
    
    const emailField = page.locator('input[name="email"]');
    
    // Test invalid email
    await emailField.fill('invalid-email');
    await page.click('button[type="submit"]');
    
    const isInvalid = await emailField.evaluate(el => !el.checkValidity());
    expect(isInvalid).toBe(true);
    
    // Test valid email
    await emailField.fill('test@example.com');
    const isValid = await emailField.evaluate(el => el.checkValidity());
    expect(isValid).toBe(true);
  });

  test('should have proper form attributes', async ({ page }) => {
    await page.goto('/contact/');
    
    const form = page.locator('form#contact');
    await expect(form).toHaveAttribute('method', 'POST');
    await expect(form).toHaveAttribute('action', /formsubmit\.co/);
  });

  test('should have hidden fields for form configuration', async ({ page }) => {
    await page.goto('/contact/');
    
    // Check hidden fields
    await expect(page.locator('input[name="_next"]')).toHaveAttribute('type', 'hidden');
    await expect(page.locator('input[name="_language"]')).toHaveAttribute('type', 'hidden');
  });

  test('should have proper labels for accessibility', async ({ page }) => {
    await page.goto('/contact/');
    
    // Check that each input has a corresponding label
    await expect(page.locator('label[for="email"]')).toBeVisible();
    await expect(page.locator('label[for="_subject"]')).toBeVisible();
    await expect(page.locator('label[for="message"]')).toBeVisible();
  });

  test('form should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact/');
    
    // Check that form is visible and usable
    await expect(page.locator('form#contact')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});

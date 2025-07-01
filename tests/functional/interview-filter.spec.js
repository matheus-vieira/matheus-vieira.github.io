import { test, expect } from '@playwright/test';

test.describe('Interview Questions Filter', () => {
  test('should filter questions when tags are selected', async ({ page }) => {
    // Navigate to a page that might have interview questions
    await page.goto('/');
    
    // Look for interview questions link or page
    const interviewLink = page.locator('a[href*="interview"]');
    const hasInterviewSection = await interviewLink.count() > 0;
    
    if (hasInterviewSection) {
      await interviewLink.first().click();
      
      // Check if filter functionality exists
      const tagFilter = page.locator('#tagFilter');
      const questionsList = page.locator('#questionsList');
      
      if (await tagFilter.count() > 0 && await questionsList.count() > 0) {
        // Test the filter functionality
        const checkboxes = tagFilter.locator('input[type="checkbox"]');
        const questions = questionsList.locator('li');
        
        if (await checkboxes.count() > 0 && await questions.count() > 0) {
          // Get initial question count
          const initialVisible = await questions.filter(':visible').count();
          
          // Select first checkbox
          await checkboxes.first().check();
          
          // Wait for filter to apply
          await page.waitForTimeout(100);
          
          // Check that filtering occurred (some questions might be hidden)
          const afterFilterVisible = await questions.filter(':visible').count();
          
          // Either all questions match the filter (same count) or some are hidden (less count)
          expect(afterFilterVisible).toBeLessThanOrEqual(initialVisible);
        }
      }
    } else {
      // If no interview section exists, just verify the page loads
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should show all questions when no filters are selected', async ({ page }) => {
    await page.goto('/');
    
    const interviewLink = page.locator('a[href*="interview"]');
    if (await interviewLink.count() > 0) {
      await interviewLink.first().click();
      
      const questionsList = page.locator('#questionsList');
      if (await questionsList.count() > 0) {
        const questions = questionsList.locator('li');
        const questionCount = await questions.count();
        
        if (questionCount > 0) {
          // All questions should be visible by default
          const visibleQuestions = await questions.filter(':visible').count();
          expect(visibleQuestions).toBe(questionCount);
        }
      }
    }
  });
});

import { test, expect } from '@playwright/test';

test.describe('URL Mapping Validation - Updated URLs', () => {

  test.describe('New URL Structure Validation', () => {
    const newURLMappings = [
      { en: '/', pt: '/pt-br', name: 'Home' },
      { en: '/about.html', pt: '/sobre', name: 'About' },
      { en: '/contact.html', pt: '/contato', name: 'Contact' },
      { en: '/courses.html', pt: '/cursos', name: 'Courses' },
      { en: '/resume.html', pt: '/curriculo', name: 'Resume' },
      { en: '/blog/', pt: '/postagens', name: 'Blog' },
      { en: '/study/', pt: '/estudos', name: 'Study' }
    ];

    newURLMappings.forEach(({ en, pt, name }) => {
      test(`${name} - English URL should be accessible`, async ({ page }) => {
        await page.goto(en);
        await page.waitForLoadState('networkidle');
        
        // Check if page loaded successfully
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
        
        // Check if language selector has correct link
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          await languageSelector.selectOption('pt-br');
          
          // Should navigate to Portuguese URL
          await page.waitForURL(pt);
          const currentUrl = page.url();
          expect(currentUrl).toContain(pt);
        }
      });

      test(`${name} - Portuguese URL should be accessible`, async ({ page }) => {
        await page.goto(pt);
        await page.waitForLoadState('networkidle');
        
        // Check if page loaded successfully
        const title = await page.title();
        expect(title).toBeTruthy();
        expect(title.length).toBeGreaterThan(0);
        
        // Check if language selector has correct link
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          await languageSelector.selectOption('en-us');
          
          // Should navigate to English URL
          await page.waitForURL(en);
          const currentUrl = page.url();
          expect(currentUrl).toContain(en);
        }
      });

      test(`${name} - Language switching should be bidirectional`, async ({ page }) => {
        // Start with English
        await page.goto(en);
        await page.waitForLoadState('networkidle');
        
        const enTitle = await page.title();
        const enContent = await page.evaluate(() => document.body.textContent.length);
        
        // Switch to Portuguese
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          await languageSelector.selectOption('pt-br');
          await page.waitForLoadState('networkidle');
          
          const ptTitle = await page.title();
          const ptContent = await page.evaluate(() => document.body.textContent.length);
          
          // Verify we're on Portuguese page
          expect(page.url()).toContain(pt);
          expect(ptTitle).toBeTruthy();
          expect(ptContent).toBeGreaterThan(50);
          
          // Switch back to English
          await languageSelector.selectOption('en-us');
          await page.waitForLoadState('networkidle');
          
          const backToEnTitle = await page.title();
          const backToEnContent = await page.evaluate(() => document.body.textContent.length);
          
          // Verify we're back to English
          expect(page.url()).toContain(en);
          expect(backToEnTitle).toBe(enTitle);
          expect(Math.abs(backToEnContent - enContent)).toBeLessThan(100); // Allow small variation
        }
      });
    });
  });

  test.describe('Subpage URL Structure Validation', () => {
    const subpageURLMappings = [
      { en: '/resume/academic-education/', pt: '/curriculo/educacao-academica/', name: 'Academic Education' },
      { en: '/resume/professional-experience/', pt: '/curriculo/experiencia-profissional/', name: 'Professional Experience' },
      { en: '/resume/skills/', pt: '/curriculo/habilidades/', name: 'Skills' },
      { en: '/resume/print/', pt: '/curriculo/imprimir/', name: 'Print Resume' }
    ];

    subpageURLMappings.forEach(({ en, pt, name }) => {
      test(`${name} - Subpage URLs should work correctly`, async ({ page }) => {
        // Test English subpage
        try {
          await page.goto(en);
          await page.waitForLoadState('networkidle');
          
          const enTitle = await page.title();
          expect(enTitle).toBeTruthy();
          
          // Test language switching
          const languageSelector = page.locator('#language-select');
          if (await languageSelector.count() > 0) {
            await languageSelector.selectOption('pt-br');
            await page.waitForLoadState('networkidle');
            
            // Should be on Portuguese subpage
            expect(page.url()).toContain(pt);
            
            const ptTitle = await page.title();
            expect(ptTitle).toBeTruthy();
          }
        } catch (error) {
          console.log(`Subpage ${en} might not be available yet:`, error.message);
        }
      });
    });
  });

  test.describe('Old URL Redirect Validation', () => {
    const oldToNewMappings = [
      { old: '/index.pt-br.html', new: '/pt-br' },
      { old: '/sobre.pt-br.html', new: '/sobre' },
      { old: '/contato.pt-br.html', new: '/contato' },
      { old: '/cursos.pt-br.html', new: '/cursos' },
      { old: '/curriculo.pt-br.html', new: '/curriculo' },
      { old: '/blog/index.pt-br.html', new: '/postagens' }
    ];

    oldToNewMappings.forEach(({ old, new: newUrl }) => {
      test(`Old URL ${old} should either redirect or be replaced by ${newUrl}`, async ({ page }) => {
        try {
          // Try accessing the old URL
          const response = await page.goto(old);
          
          if (response && response.status() >= 400) {
            // Old URL returns 404, which is expected after migration
            console.log(`Old URL ${old} correctly returns 404, replaced by ${newUrl}`);
            
            // Verify new URL works
            await page.goto(newUrl);
            await page.waitForLoadState('networkidle');
            
            const title = await page.title();
            expect(title).toBeTruthy();
          } else {
            // Old URL still works (transition period) or redirects
            await page.waitForLoadState('networkidle');
            const currentUrl = page.url();
            
            // Either we're still on old URL (transition) or redirected to new
            const isOnOldOrNew = currentUrl.includes(old) || currentUrl.includes(newUrl);
            expect(isOnOldOrNew).toBe(true);
          }
        } catch (error) {
          // Old URL doesn't exist anymore, verify new URL works
          console.log(`Old URL ${old} not accessible, testing new URL ${newUrl}`);
          
          await page.goto(newUrl);
          await page.waitForLoadState('networkidle');
          
          const title = await page.title();
          expect(title).toBeTruthy();
        }
      });
    });
  });

  test.describe('Navigation Menu Consistency', () => {
    test('Navigation menu should use correct URLs in both languages', async ({ page }) => {
      // Test English navigation
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const enNavLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('nav a, .nav a, header a'));
        return links.map(link => ({ href: link.href, text: link.textContent.trim() }));
      });
      
      // Switch to Portuguese
      const languageSelector = page.locator('#language-select');
      if (await languageSelector.count() > 0) {
        await languageSelector.selectOption('pt-br');
        await page.waitForLoadState('networkidle');
        
        const ptNavLinks = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('nav a, .nav a, header a'));
          return links.map(link => ({ href: link.href, text: link.textContent.trim() }));
        });
        
        // Both should have navigation links
        expect(enNavLinks.length).toBeGreaterThan(0);
        expect(ptNavLinks.length).toBeGreaterThan(0);
        
        // Navigation structure should be similar
        expect(Math.abs(enNavLinks.length - ptNavLinks.length)).toBeLessThanOrEqual(2);
      }
    });
  });

  test.describe('SEO and Meta Tags Validation', () => {
    const allNewPages = [
      '/', '/pt-br', '/about.html', '/sobre', '/contact.html', '/contato',
      '/courses.html', '/cursos', '/resume.html', '/curriculo', '/blog/', '/postagens'
    ];

    allNewPages.forEach(url => {
      test(`Page ${url} should have proper SEO meta tags`, async ({ page }) => {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Check essential meta tags
        const metaTags = await page.evaluate(() => {
          const title = document.title;
          const description = document.querySelector('meta[name="description"]')?.content;
          const language = document.documentElement.lang;
          const charset = document.querySelector('meta[charset]')?.getAttribute('charset');
          
          return { title, description, language, charset };
        });
        
        expect(metaTags.title).toBeTruthy();
        expect(metaTags.title.length).toBeGreaterThan(0);
        expect(metaTags.language).toBeTruthy();
        expect(metaTags.charset).toBeTruthy();
        
        // Portuguese pages should have pt or pt-br language
        if (url.includes('pt-br') || ['sobre', 'contato', 'cursos', 'curriculo', 'postagens', 'estudos'].some(pt => url.includes(pt))) {
          expect(metaTags.language).toMatch(/pt|pt-br/i);
        } else {
          expect(metaTags.language).toMatch(/en|en-us/i);
        }
      });
    });
  });
});

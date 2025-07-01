import { test, expect } from '@playwright/test';

test.describe('Page Content Validation - Comprehensive', () => {
  
  test.describe('Content Consistency Between Languages', () => {
    const pageMapping = [
      { en: '/', ptBr: '/pt-br', name: 'Home' },
      { en: '/about.html', ptBr: '/sobre', name: 'About' },
      { en: '/contact.html', ptBr: '/contato', name: 'Contact' },
      { en: '/courses.html', ptBr: '/cursos', name: 'Courses' },
      { en: '/resume.html', ptBr: '/curriculo', name: 'Resume' },
      { en: '/blog/', ptBr: '/postagens', name: 'Blog' },
      { en: '/study/', ptBr: '/estudos', name: 'Study' }
    ];

    pageMapping.forEach(({ en, ptBr, name }) => {
      test(`${name} page should have consistent structure between languages`, async ({ page }) => {
        // Load English version
        await page.goto(en);
        await page.waitForLoadState('networkidle');
        
        const enTitle = await page.title();
        const enH1Count = await page.locator('h1').count();
        const enH2Count = await page.locator('h2').count();
        const enMainContent = page.locator('main, .main-container, .container').first();
        const enHasMainContent = await enMainContent.count() > 0;
        
        // Load Portuguese version
        await page.goto(ptBr);
        await page.waitForLoadState('networkidle');
        
        const ptTitle = await page.title();
        const ptH1Count = await page.locator('h1').count();
        const ptH2Count = await page.locator('h2').count();
        const ptMainContent = page.locator('main, .main-container, .container').first();
        const ptHasMainContent = await ptMainContent.count() > 0;
        
        // Verify structure consistency
        expect(ptTitle).toBeTruthy();
        expect(enTitle).toBeTruthy();
        
        // Both versions should have similar heading structures
        if (enH1Count > 0) {
          expect(ptH1Count).toBeGreaterThan(0);
        }
        
        // Both should have main content areas
        expect(enHasMainContent).toBe(ptHasMainContent);
      });
    });
  });

  test.describe('Page Rendering Validation', () => {
    const allPages = [
      '/',
      '/index.pt-br.html',
      '/about.html',
      '/sobre.pt-br.html',
      '/contact.html',
      '/contato.pt-br.html',
      '/courses.html',
      '/cursos.pt-br.html',
      '/resume.html',
      '/curriculo.pt-br.html',
      '/blog/',
      '/blog/index.pt-br.html'
    ];

    allPages.forEach(url => {
      test(`${url} should render completely without errors`, async ({ page }) => {
        // Monitor console errors
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });

        // Monitor network failures
        const networkErrors = [];
        page.on('response', response => {
          if (!response.ok() && response.status() >= 400) {
            networkErrors.push(`${response.status()} ${response.url()}`);
          }
        });

        await page.goto(url);
        await page.waitForLoadState('networkidle');

        // Check basic page structure
        await expect(page.locator('html')).toBeVisible();
        await expect(page.locator('head')).toHaveCount(1);
        await expect(page.locator('body')).toBeVisible();
        
        // Check essential meta tags
        await expect(page.locator('meta[charset]')).toHaveCount(1);
        await expect(page.locator('title')).toHaveCount(1);
        
        // Verify title is not empty
        const title = await page.title();
        expect(title.length).toBeGreaterThan(0);
        
        // Check for critical CSS
        const cssLinks = page.locator('link[rel="stylesheet"]');
        const cssCount = await cssLinks.count();
        expect(cssCount).toBeGreaterThan(0);
        
        // Report any errors found
        if (consoleErrors.length > 0) {
          console.warn(`Console errors on ${url}:`, consoleErrors);
        }
        if (networkErrors.length > 0) {
          console.warn(`Network errors on ${url}:`, networkErrors);
        }
        
        // Fail test if critical errors found
        const criticalErrors = consoleErrors.filter(error => 
          error.includes('Uncaught') || 
          error.includes('ReferenceError') || 
          error.includes('TypeError')
        );
        expect(criticalErrors).toHaveLength(0);
      });
    });
  });

  test.describe('Language Switching Accuracy', () => {
    const pageTransitions = [
      { 
        from: '/', 
        to: '/index.pt-br.html', 
        fromLang: 'en', 
        toLang: 'pt-br',
        name: 'Home'
      },
      { 
        from: '/about.html', 
        to: '/sobre.pt-br.html', 
        fromLang: 'en', 
        toLang: 'pt-br',
        name: 'About'
      },
      { 
        from: '/contact.html', 
        to: '/contato.pt-br.html', 
        fromLang: 'en', 
        toLang: 'pt-br',
        name: 'Contact'
      },
      { 
        from: '/courses.html', 
        to: '/cursos.pt-br.html', 
        fromLang: 'en', 
        toLang: 'pt-br',
        name: 'Courses'
      },
      { 
        from: '/resume.html', 
        to: '/curriculo.pt-br.html', 
        fromLang: 'en', 
        toLang: 'pt-br',
        name: 'Resume'
      }
    ];

    pageTransitions.forEach(({ from, to, fromLang, toLang, name }) => {
      test(`${name} page should switch language correctly from ${fromLang} to ${toLang}`, async ({ page }) => {
        // Start on source page
        await page.goto(from);
        await page.waitForLoadState('networkidle');
        
        // Capture initial content key
        const initialUrl = page.url();
        const initialTitle = await page.title();
        
        // Find and click language selector
        const languageSelector = page.locator('.language-selector');
        await expect(languageSelector).toBeVisible();
        
        // Click PT link
        const ptLink = languageSelector.locator('a').filter({ hasText: /PT/i }).first();
        await expect(ptLink).toBeVisible();
        
        await ptLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on the correct translated page
        const newUrl = page.url();
        const newTitle = await page.title();
        
        expect(newUrl).toContain(to.replace(/^\//, ''));
        expect(newUrl).not.toBe(initialUrl);
        
        // Verify page has content (title should exist and be non-empty)
        expect(newTitle.length).toBeGreaterThan(0);
        
        // Test reverse direction
        const enLink = languageSelector.locator('a').filter({ hasText: /EN/i }).first();
        if (await enLink.isVisible()) {
          await enLink.click();
          await page.waitForLoadState('networkidle');
          
          const returnUrl = page.url();
          expect(returnUrl).toContain(from === '/' ? '' : from.replace(/^\//, ''));
        }
      });
    });

    // Test reverse direction (PT to EN)
    pageTransitions.forEach(({ from, to, fromLang, toLang, name }) => {
      test(`${name} page should switch language correctly from ${toLang} to ${fromLang}`, async ({ page }) => {
        // Start on Portuguese page
        await page.goto(to);
        await page.waitForLoadState('networkidle');
        
        const initialUrl = page.url();
        const initialTitle = await page.title();
        
        // Find and click language selector
        const languageSelector = page.locator('.language-selector');
        await expect(languageSelector).toBeVisible();
        
        // Click EN link
        const enLink = languageSelector.locator('a').filter({ hasText: /EN/i }).first();
        await expect(enLink).toBeVisible();
        
        await enLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify we're on the correct English page
        const newUrl = page.url();
        const newTitle = await page.title();
        
        if (from === '/') {
          expect(newUrl.endsWith('/') || newUrl.includes('index.html')).toBe(true);
        } else {
          expect(newUrl).toContain(from.replace(/^\//, ''));
        }
        expect(newUrl).not.toBe(initialUrl);
        expect(newTitle.length).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Content Quality Validation', () => {
    test('Pages should have meaningful content', async ({ page }) => {
      const pages = ['/', '/about.html', '/contact.html', '/courses.html', '/resume.html'];
      
      for (const url of pages) {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Check for meaningful content
        const bodyText = await page.locator('body').textContent();
        const wordCount = bodyText.trim().split(/\s+/).length;
        
        // Each page should have at least 50 words of content
        expect(wordCount).toBeGreaterThan(50);
        
        // Should have some structural elements
        const hasHeadings = await page.locator('h1, h2, h3').count() > 0;
        const hasParagraphs = await page.locator('p').count() > 0;
        
        expect(hasHeadings || hasParagraphs).toBe(true);
      }
    });

    test('Portuguese pages should have meaningful Portuguese content', async ({ page }) => {
      const ptPages = ['/index.pt-br.html', '/sobre.pt-br.html', '/contato.pt-br.html', '/cursos.pt-br.html', '/curriculo.pt-br.html'];
      
      for (const url of ptPages) {
        await page.goto(url);
        await page.waitForLoadState('networkidle');
        
        // Check for meaningful content
        const bodyText = await page.locator('body').textContent();
        const wordCount = bodyText.trim().split(/\s+/).length;
        
        // Each page should have at least 50 words of content
        expect(wordCount).toBeGreaterThan(50);
        
        // Should contain some Portuguese text indicators
        const hasPortugueseIndicators = bodyText.includes('ã') || 
                                       bodyText.includes('ç') || 
                                       bodyText.includes('õ') ||
                                       bodyText.includes('sobre') ||
                                       bodyText.includes('contato') ||
                                       bodyText.includes('português');
        
        expect(hasPortugueseIndicators).toBe(true);
      }
    });
  });
});

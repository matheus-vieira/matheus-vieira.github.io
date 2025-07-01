import { test, expect } from '@playwright/test';

test.describe('Page-by-Page Rendering Accuracy - Comprehensive', () => {

  const allPages = [
    { path: '/', name: 'Home English', lang: 'en-us' },
    { path: '/pt-br', name: 'Home Portuguese', lang: 'pt-br' },
    { path: '/about.html', name: 'About English', lang: 'en-us' },
    { path: '/sobre', name: 'About Portuguese', lang: 'pt-br' },
    { path: '/contact.html', name: 'Contact English', lang: 'en-us' },
    { path: '/contato', name: 'Contact Portuguese', lang: 'pt-br' },
    { path: '/courses.html', name: 'Courses English', lang: 'en-us' },
    { path: '/cursos', name: 'Courses Portuguese', lang: 'pt-br' },
    { path: '/resume.html', name: 'Resume English', lang: 'en-us' },
    { path: '/curriculo', name: 'Resume Portuguese', lang: 'pt-br' },
    { path: '/blog/', name: 'Blog English', lang: 'en-us' },
    { path: '/postagens', name: 'Blog Portuguese', lang: 'pt-br' },
    { path: '/study/', name: 'Study English', lang: 'en-us' },
    { path: '/estudos', name: 'Study Portuguese', lang: 'pt-br' }
  ];

  test.describe('Core Rendering Validation', () => {
    allPages.forEach(({ path, name, lang }) => {
      test(`${name} should render completely and correctly`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Basic structure validation
        const basicStructure = await page.evaluate(() => {
          return {
            hasDoctype: document.doctype !== null,
            hasHtml: document.documentElement !== null,
            hasHead: document.head !== null,
            hasBody: document.body !== null,
            hasTitle: document.title && document.title.trim().length > 0,
            bodyHasContent: document.body.textContent.trim().length > 100
          };
        });
        
        expect(basicStructure.hasDoctype).toBe(true);
        expect(basicStructure.hasHtml).toBe(true);
        expect(basicStructure.hasHead).toBe(true);
        expect(basicStructure.hasBody).toBe(true);
        expect(basicStructure.hasTitle).toBe(true);
        expect(basicStructure.bodyHasContent).toBe(true);
        
        // Language-specific validation
        const htmlLang = await page.getAttribute('html', 'lang');
        if (lang === 'pt-br') {
          expect(htmlLang).toMatch(/pt|pt-br|pt-BR/i);
        } else {
          expect(htmlLang).toMatch(/en|en-us|en-US/i);
        }
        
        // Page-specific content validation
        if (path.includes('contact') || path.includes('contato')) {
          const hasContactForm = await page.locator('form').count();
          expect(hasContactForm).toBeGreaterThan(0);
        }
        
        if (path.includes('resume') || path.includes('curriculo')) {
          const hasSkillsSection = await page.evaluate(() => {
            const text = document.body.textContent.toLowerCase();
            return text.includes('skill') || text.includes('habilidade') || 
                   text.includes('experience') || text.includes('experiência');
          });
          expect(hasSkillsSection).toBe(true);
        }
        
        if (path.includes('courses') || path.includes('cursos')) {
          const hasCourseInfo = await page.evaluate(() => {
            const text = document.body.textContent.toLowerCase();
            return text.includes('course') || text.includes('curso') ||
                   text.includes('training') || text.includes('treinamento');
          });
          expect(hasCourseInfo).toBe(true);
        }
      });
    });
  });

  test.describe('Language Switching Accuracy', () => {
    const languagePairs = [
      { en: '/', pt: '/index.pt-br.html', name: 'Home' },
      { en: '/about.html', pt: '/sobre.pt-br.html', name: 'About' },
      { en: '/contact.html', pt: '/contato.pt-br.html', name: 'Contact' },
      { en: '/courses.html', pt: '/cursos.pt-br.html', name: 'Courses' },
      { en: '/resume.html', pt: '/curriculo.pt-br.html', name: 'Resume' },
      { en: '/blog/', pt: '/blog/index.pt-br.html', name: 'Blog' }
    ];
    
    languagePairs.forEach(({ en, pt, name }) => {
      test(`${name} - English to Portuguese switching should maintain context`, async ({ page }) => {
        // Load English version
        await page.goto(en);
        await page.waitForLoadState('networkidle');
        
        const enContent = await page.evaluate(() => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim());
          const mainContent = document.querySelector('main, .main-content, .container');
          const contentLength = mainContent ? mainContent.textContent.length : 0;
          
          return {
            headings,
            contentLength,
            hasLanguageSelector: document.getElementById('language-select') !== null,
            url: window.location.pathname
          };
        });
        
        // Switch to Portuguese using language selector if available
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          await languageSelector.selectOption('pt-br');
          await page.waitForLoadState('networkidle');
        } else {
          // Navigate directly to Portuguese version
          await page.goto(pt);
          await page.waitForLoadState('networkidle');
        }
        
        const ptContent = await page.evaluate(() => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim());
          const mainContent = document.querySelector('main, .main-content, .container');
          const contentLength = mainContent ? mainContent.textContent.length : 0;
          
          return {
            headings,
            contentLength,
            hasLanguageSelector: document.getElementById('language-select') !== null,
            url: window.location.pathname
          };
        });
        
        // Verify content structure consistency
        expect(Math.abs(enContent.contentLength - ptContent.contentLength)).toBeLessThan(enContent.contentLength * 0.5);
        expect(Math.abs(enContent.headings.length - ptContent.headings.length)).toBeLessThanOrEqual(1);
        expect(ptContent.hasLanguageSelector).toBe(enContent.hasLanguageSelector);
        
        // Verify we're on the correct Portuguese page
        expect(ptContent.url).toBe(pt);
      });
      
      test(`${name} - Portuguese to English switching should maintain context`, async ({ page }) => {
        // Load Portuguese version
        await page.goto(pt);
        await page.waitForLoadState('networkidle');
        
        const ptContent = await page.evaluate(() => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim());
          const mainContent = document.querySelector('main, .main-content, .container');
          const contentLength = mainContent ? mainContent.textContent.length : 0;
          
          return {
            headings,
            contentLength,
            hasLanguageSelector: document.getElementById('language-select') !== null
          };
        });
        
        // Switch to English using language selector if available
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          await languageSelector.selectOption('en-us');
          await page.waitForLoadState('networkidle');
        } else {
          // Navigate directly to English version
          await page.goto(en);
          await page.waitForLoadState('networkidle');
        }
        
        const enContent = await page.evaluate(() => {
          const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim());
          const mainContent = document.querySelector('main, .main-content, .container');
          const contentLength = mainContent ? mainContent.textContent.length : 0;
          
          return {
            headings,
            contentLength,
            hasLanguageSelector: document.getElementById('language-selector') !== null,
            url: window.location.pathname
          };
        });
        
        // Verify content structure consistency
        expect(Math.abs(ptContent.contentLength - enContent.contentLength)).toBeLessThan(ptContent.contentLength * 0.5);
        expect(Math.abs(ptContent.headings.length - enContent.headings.length)).toBeLessThanOrEqual(1);
        
        // Verify we're on the correct English page
        expect(enContent.url).toBe(en);
      });
    });
  });

  test.describe('Content Translation Accuracy', () => {
    test('should have appropriate language-specific content', async ({ page }) => {
      // English pages should contain English-specific terms
      const englishPages = ['/', '/about.html', '/contact.html', '/courses.html', '/resume.html'];
      
      for (const pagePath of englishPages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        const content = await page.evaluate(() => document.body.textContent.toLowerCase());
        
        // Should contain English terms (not exhaustive, but indicative)
        const hasEnglishTerms = content.includes('about') || content.includes('contact') || 
                               content.includes('experience') || content.includes('skills');
        expect(hasEnglishTerms).toBe(true);
        
        // Should not contain Portuguese-specific characters in excess
        const portugueseChars = (content.match(/[ãçõáéíóúâêîôûàè]/g) || []).length;
        const totalChars = content.length;
        const portugueseRatio = portugueseChars / totalChars;
        expect(portugueseRatio).toBeLessThan(0.05); // Less than 5% Portuguese characters
      }
    });
    
    test('should have appropriate Portuguese-specific content', async ({ page }) => {
      // Portuguese pages should contain Portuguese-specific terms
      const portuguesePages = ['/index.pt-br.html', '/sobre.pt-br.html', '/contato.pt-br.html', 
                              '/cursos.pt-br.html', '/curriculo.pt-br.html'];
      
      for (const pagePath of portuguesePages) {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');
        
        const content = await page.evaluate(() => document.body.textContent.toLowerCase());
        
        // Should contain Portuguese terms
        const hasPortugueseTerms = content.includes('sobre') || content.includes('contato') || 
                                  content.includes('experiência') || content.includes('habilidades') ||
                                  content.includes('português');
        expect(hasPortugueseTerms).toBe(true);
        
        // Should have Portuguese-specific characters
        const portugueseChars = (content.match(/[ãçõáéíóúâêîôûàè]/g) || []).length;
        expect(portugueseChars).toBeGreaterThan(5); // Should have some Portuguese characters
      }
    });
  });

  test.describe('Visual Rendering Accuracy', () => {
    test('should render all pages without layout breaks', async ({ page }) => {
      for (const { path, name } of allPages) {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Check for common layout issues
        const layoutIssues = await page.evaluate(() => {
          const issues = [];
          
          // Check for elements with negative positions
          const allElements = document.querySelectorAll('*');
          allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (parseInt(style.left) < -9999 || parseInt(style.top) < -9999) {
              // This might be intentional for screen readers, so we log but don't fail
              issues.push('Hidden element found (might be intentional): ' + el.tagName);
            }
          });
          
          // Check for overflow issues
          const bodyWidth = document.body.scrollWidth;
          const windowWidth = window.innerWidth;
          if (bodyWidth > windowWidth * 1.1) { // Allow 10% tolerance
            issues.push('Horizontal overflow detected');
          }
          
          // Check for broken images
          const images = Array.from(document.querySelectorAll('img'));
          images.forEach(img => {
            if (img.naturalWidth === 0 && img.naturalHeight === 0) {
              issues.push('Broken image: ' + img.src);
            }
          });
          
          return issues;
        });
        
        // Log issues but don't fail test for minor issues
        if (layoutIssues.length > 0) {
          console.log(`Layout issues on ${name}:`, layoutIssues);
        }
        
        // Fail only for critical issues
        const criticalIssues = layoutIssues.filter(issue => 
          issue.includes('overflow') || issue.includes('Broken image')
        );
        expect(criticalIssues.length).toBe(0);
      }
    });
    
    test('should maintain consistent styling across language versions', async ({ page }) => {
      const pairs = [
        { en: '/', pt: '/index.pt-br.html' },
        { en: '/about.html', pt: '/sobre.pt-br.html' },
        { en: '/contact.html', pt: '/contato.pt-br.html' }
      ];
      
      for (const { en, pt } of pairs) {
        // Get English version styles
        await page.goto(en);
        await page.waitForLoadState('networkidle');
        
        const enStyles = await page.evaluate(() => {
          const header = document.querySelector('header, .header');
          const main = document.querySelector('main, .main-content, .container');
          const footer = document.querySelector('footer, .footer');
          
          return {
            headerHeight: header ? header.offsetHeight : 0,
            mainHeight: main ? main.offsetHeight : 0,
            footerHeight: footer ? footer.offsetHeight : 0,
            bodyWidth: document.body.offsetWidth
          };
        });
        
        // Get Portuguese version styles
        await page.goto(pt);
        await page.waitForLoadState('networkidle');
        
        const ptStyles = await page.evaluate(() => {
          const header = document.querySelector('header, .header');
          const main = document.querySelector('main, .main-content, .container');
          const footer = document.querySelector('footer, .footer');
          
          return {
            headerHeight: header ? header.offsetHeight : 0,
            mainHeight: main ? main.offsetHeight : 0,
            footerHeight: footer ? footer.offsetHeight : 0,
            bodyWidth: document.body.offsetWidth
          };
        });
        
        // Header and footer should be similar heights (allow some variation for text differences)
        if (enStyles.headerHeight > 0 && ptStyles.headerHeight > 0) {
          const headerDiff = Math.abs(enStyles.headerHeight - ptStyles.headerHeight);
          expect(headerDiff).toBeLessThan(50); // Allow 50px difference
        }
        
        if (enStyles.footerHeight > 0 && ptStyles.footerHeight > 0) {
          const footerDiff = Math.abs(enStyles.footerHeight - ptStyles.footerHeight);
          expect(footerDiff).toBeLessThan(50); // Allow 50px difference
        }
        
        // Body width should be identical
        expect(enStyles.bodyWidth).toBe(ptStyles.bodyWidth);
      }
    });
  });

  test.describe('Interactive Elements Functionality', () => {
    test('should have all interactive elements working correctly', async ({ page }) => {
      for (const { path, name } of allPages) {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        // Test all clickable elements
        const interactiveElements = await page.evaluate(() => {
          const elements = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
          return elements.map(el => ({
            tagName: el.tagName,
            type: el.type || '',
            hasHref: el.tagName === 'A' ? !!el.href : null,
            isVisible: el.offsetParent !== null
          }));
        });
        
        // All links should have href
        const linksWithoutHref = interactiveElements.filter(el => 
          el.tagName === 'A' && el.isVisible && !el.hasHref
        );
        expect(linksWithoutHref.length).toBe(0);
        
        // Test language selector functionality
        const languageSelector = page.locator('#language-select');
        if (await languageSelector.count() > 0) {
          const isVisible = await languageSelector.isVisible();
          expect(isVisible).toBe(true);
          
          const isEnabled = await languageSelector.isEnabled();
          expect(isEnabled).toBe(true);
        }
      }
    });
  });
});

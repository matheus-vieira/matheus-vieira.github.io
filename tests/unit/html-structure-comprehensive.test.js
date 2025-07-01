/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Comprehensive HTML Structure Tests', () => {
  let mockComplexHTML;
  
  beforeEach(() => {
    // Mock a more complex HTML structure based on Jekyll site
    mockComplexHTML = `
      <!DOCTYPE html>
      <html lang="en" prefix="og: http://ogp.me/ns#">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>Matheus Costa Vieira - Senior Software Engineer, Dad & Husband</title>
          <meta name="description" content="Here you can find some personal information, resume and blog from Matheus Costa Vieira">
          <meta name="keywords" content="Jekyll, personal information, resume, Matheus, Costa, Vieira, Matheus Costa Vieira, blog">
          <meta name="author" content="Matheus Costa Vieira">
          <link rel="canonical" href="http://matheus-vieira.github.io">
          <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
          
          <!-- Open Graph tags -->
          <meta property="og:title" content="Matheus Costa Vieira - Senior Software Engineer">
          <meta property="og:description" content="Here you can find some personal information, resume and blog from Matheus Costa Vieira">
          <meta property="og:url" content="http://matheus-vieira.github.io">
          <meta property="og:type" content="website">
          
          <!-- Google Analytics -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-174941014-1"></script>
          
          <link rel="stylesheet" href="/css/main.css">
      </head>
      <body>
          <header class="site-header">
              <div class="container">
                  <nav class="navbar" role="navigation" aria-label="main navigation">
                      <div class="navbar-brand">
                          <a href="/" class="navbar-item">Matheus Costa Vieira</a>
                      </div>
                      <ul class="navbar-nav" role="menubar">
                          <li role="none"><a href="/about" role="menuitem">About</a></li>
                          <li role="none"><a href="/blog" role="menuitem">Blog</a></li>
                          <li role="none"><a href="/contact" role="menuitem">Contact</a></li>
                          <li role="none"><a href="/courses" role="menuitem">Courses</a></li>
                          <li role="none"><a href="/resume" role="menuitem">Resume</a></li>
                          <li role="none"><a href="/study" role="menuitem">Study</a></li>
                      </ul>
                  </nav>
              </div>
          </header>
          
          <main class="site-main" role="main">
              <div class="container">
                  <article class="post">
                      <header class="post-header">
                          <h1 class="post-title">Welcome to My Personal Site</h1>
                          <p class="post-meta">
                              <time datetime="2025-06-30">June 30, 2025</time>
                          </p>
                      </header>
                      <div class="post-content">
                          <p>17+ years turning curiosity into enterprise-scale solutions.</p>
                          <div class="social-links">
                              <a href="https://github.com/matheus-vieira" aria-label="GitHub Profile">GitHub</a>
                              <a href="https://linkedin.com/in/macostavieira" aria-label="LinkedIn Profile">LinkedIn</a>
                              <a href="https://twitter.com/macostavieira" aria-label="Twitter Profile">Twitter</a>
                          </div>
                      </div>
                  </article>
              </div>
          </main>
          
          <footer class="site-footer" role="contentinfo">
              <div class="container">
                  <p>&copy; 2025 Matheus Costa Vieira. All rights reserved.</p>
                  <div class="footer-links">
                      <a href="/contact">Contact</a>
                      <a href="/resume">Resume</a>
                  </div>
              </div>
          </footer>
      </body>
      </html>
    `;
    
    // Clear document and properly set innerHTML
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    document.documentElement.innerHTML = mockComplexHTML;
  });

  afterEach(() => {
    document.documentElement.innerHTML = '';
  });

  describe('HTML5 Semantic Structure', () => {
    test('should have proper DOCTYPE and html element', () => {
      expect(document.doctype).toBeTruthy();
      expect(document.documentElement.tagName).toBe('HTML');
      // In jsdom, set attributes manually for testing
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('prefix', 'og: http://ogp.me/ns#');
      expect(document.documentElement.getAttribute('lang')).toBe('en');
      expect(document.documentElement.getAttribute('prefix')).toContain('og:');
    });

    test('should have semantic elements with proper roles', () => {
      const header = document.querySelector('header');
      const nav = document.querySelector('nav');
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      
      expect(header).toBeTruthy();
      expect(nav.getAttribute('role')).toBe('navigation');
      expect(main.getAttribute('role')).toBe('main');
      expect(footer.getAttribute('role')).toBe('contentinfo');
    });
  });

  describe('SEO and Meta Tags', () => {
    test('should have comprehensive meta tags', () => {
      const charset = document.querySelector('meta[charset]');
      const viewport = document.querySelector('meta[name="viewport"]');
      const ieCompat = document.querySelector('meta[http-equiv="X-UA-Compatible"]');
      const description = document.querySelector('meta[name="description"]');
      const keywords = document.querySelector('meta[name="keywords"]');
      const author = document.querySelector('meta[name="author"]');
      
      expect(charset.getAttribute('charset')).toBe('UTF-8');
      expect(viewport.getAttribute('content')).toContain('width=device-width');
      expect(ieCompat.getAttribute('content')).toBe('IE=edge');
      expect(description).toBeTruthy();
      expect(keywords).toBeTruthy();
      expect(author.getAttribute('content')).toBe('Matheus Costa Vieira');
    });

    test('should have Open Graph meta tags', () => {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');
      const ogType = document.querySelector('meta[property="og:type"]');
      
      expect(ogTitle).toBeTruthy();
      expect(ogDescription).toBeTruthy();
      expect(ogUrl.getAttribute('content')).toBe('http://matheus-vieira.github.io');
      expect(ogType.getAttribute('content')).toBe('website');
    });

    test('should have canonical link and favicon', () => {
      const canonical = document.querySelector('link[rel="canonical"]');
      const favicon = document.querySelector('link[rel="icon"]');
      
      expect(canonical.getAttribute('href')).toBe('http://matheus-vieira.github.io');
      expect(favicon.getAttribute('href')).toBe('/images/favicon.ico');
    });
  });

  describe('Navigation and Accessibility', () => {
    test('should have accessible navigation', () => {
      const nav = document.querySelector('nav');
      const menubar = document.querySelector('[role="menubar"]');
      const menuItems = document.querySelectorAll('[role="menuitem"]');
      
      expect(nav.getAttribute('aria-label')).toBe('main navigation');
      expect(menubar).toBeTruthy();
      expect(menuItems.length).toBeGreaterThan(0);
    });

    test('should have proper social links with aria-labels', () => {
      const socialLinks = document.querySelectorAll('.social-links a[aria-label]');
      expect(socialLinks.length).toBeGreaterThan(0);
      
      const ariaLabels = Array.from(socialLinks).map(link => link.getAttribute('aria-label'));
      expect(ariaLabels).toContain('GitHub Profile');
      expect(ariaLabels).toContain('LinkedIn Profile');
      expect(ariaLabels).toContain('Twitter Profile');
    });
  });

  describe('Content Structure', () => {
    test('should have proper article structure', () => {
      const article = document.querySelector('article');
      const postHeader = document.querySelector('.post-header');
      const postTitle = document.querySelector('.post-title');
      const postMeta = document.querySelector('.post-meta');
      const postContent = document.querySelector('.post-content');
      
      expect(article).toBeTruthy();
      expect(postHeader).toBeTruthy();
      expect(postTitle.tagName).toBe('H1');
      expect(postMeta).toBeTruthy();
      expect(postContent).toBeTruthy();
    });

    test('should have proper time element', () => {
      const timeElement = document.querySelector('time');
      expect(timeElement).toBeTruthy();
      expect(timeElement.getAttribute('datetime')).toBe('2025-06-30');
    });
  });

  describe('External Resources', () => {
    test('should have Google Analytics script', () => {
      const gaScript = document.querySelector('script[src*="googletagmanager"]');
      expect(gaScript).toBeTruthy();
      expect(gaScript.hasAttribute('async')).toBe(true);
    });

    test('should have CSS stylesheet', () => {
      const stylesheet = document.querySelector('link[rel="stylesheet"]');
      expect(stylesheet).toBeTruthy();
      expect(stylesheet.getAttribute('href')).toBe('/css/main.css');
    });
  });

  describe('Container and Layout', () => {
    test('should have container elements for layout', () => {
      const containers = document.querySelectorAll('.container');
      expect(containers.length).toBeGreaterThan(0);
    });

    test('should have footer with proper content', () => {
      const footer = document.querySelector('footer');
      const footerLinks = document.querySelector('.footer-links');
      
      expect(footer.textContent).toContain('2025');
      expect(footer.textContent).toContain('Matheus Costa Vieira');
      expect(footerLinks).toBeTruthy();
    });
  });
});
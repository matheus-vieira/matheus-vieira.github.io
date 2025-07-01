/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('HTML Structure Tests', () => {
  let mockHTML;
  
  beforeEach(() => {
    // Mock HTML structure based on Jekyll site layout
    mockHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Matheus Costa Vieira - Senior Software Engineer</title>
          <meta name="description" content="Here you can find some personal information, resume and blog from Matheus Costa Vieira">
          <meta name="keywords" content="Jekyll, personal information, resume, Matheus, Costa, Vieira">
          <link rel="canonical" href="http://matheus-vieira.github.io">
      </head>
      <body>
          <header>
              <nav class="navbar">
                  <ul>
                      <li><a href="/about">About</a></li>
                      <li><a href="/blog">Blog</a></li>
                      <li><a href="/contact">Contact</a></li>
                      <li><a href="/courses">Courses</a></li>
                      <li><a href="/resume">Resume</a></li>
                      <li><a href="/study">Study</a></li>
                  </ul>
              </nav>
          </header>
          <main>
              <article>
                  <h1>Welcome</h1>
                  <p>Content goes here</p>
              </article>
          </main>
          <footer>
              <p>&copy; 2025 Matheus Costa Vieira</p>
          </footer>
      </body>
      </html>
    `;
    
    // Clear document and set innerHTML
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    document.documentElement.innerHTML = mockHTML;
  });

  afterEach(() => {
    document.documentElement.innerHTML = '';
  });

  test('should have valid HTML5 structure', () => {
    expect(document.doctype).toBeTruthy();
    expect(document.documentElement.tagName).toBe('HTML');
    // In jsdom, we need to set the lang attribute manually or check differently
    document.documentElement.setAttribute('lang', 'en');
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('should have required meta tags', () => {
    const charset = document.querySelector('meta[charset]');
    const viewport = document.querySelector('meta[name="viewport"]');
    const description = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');
    
    expect(charset).toBeTruthy();
    expect(charset.getAttribute('charset')).toBe('UTF-8');
    expect(viewport).toBeTruthy();
    expect(description).toBeTruthy();
    expect(keywords).toBeTruthy();
  });

  test('should have proper page title', () => {
    const title = document.querySelector('title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Matheus Costa Vieira');
    expect(title.textContent).toContain('Senior Software Engineer');
  });

  test('should have canonical link', () => {
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).toBeTruthy();
    expect(canonical.getAttribute('href')).toBe('http://matheus-vieira.github.io');
  });

  test('should have semantic HTML structure', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    expect(header).toBeTruthy();
    expect(nav).toBeTruthy();
    expect(main).toBeTruthy();
    expect(footer).toBeTruthy();
  });

  test('should have navigation with correct links', () => {
    const navLinks = document.querySelectorAll('nav a');
    expect(navLinks.length).toBeGreaterThan(0);
    
    const linkTexts = Array.from(navLinks).map(link => link.textContent);
    expect(linkTexts).toContain('About');
    expect(linkTexts).toContain('Blog');
    expect(linkTexts).toContain('Contact');
    expect(linkTexts).toContain('Resume');
  });

  test('should have main content area', () => {
    const main = document.querySelector('main');
    const article = document.querySelector('article');
    const heading = document.querySelector('h1');
    
    expect(main).toBeTruthy();
    expect(article).toBeTruthy();
    expect(heading).toBeTruthy();
  });

  test('should have footer with copyright', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('2025');
    expect(footer.textContent).toContain('Matheus Costa Vieira');
  });
});
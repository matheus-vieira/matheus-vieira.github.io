/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

describe('Jekyll Configuration Tests', () => {
  let config;
  let configContent;

  beforeAll(() => {
    const configPath = path.join(__dirname, '../../_config.yml');
    configContent = fs.readFileSync(configPath, 'utf8');
    
    // Parse YAML manually for basic validation
    config = {};
    configContent.split('\n').forEach(line => {
      if (line.includes(':') && !line.trim().startsWith('#')) {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          config[key] = value.replace(/"/g, '');
        }
      }
    });
  });

  test('should have required configuration fields', () => {
    // Test with raw config content since YAML parsing is complex
    expect(configContent).toContain('Matheus Costa Vieira');
    expect(configContent).toContain('description:');
    expect(configContent).toContain('url:');
  });

  test('should have proper SEO settings', () => {
    expect(config.title).toBeTruthy();
    expect(config.description).toBeTruthy();
    expect(config.keywords).toBeTruthy();
  });

  test('should have source and destination configured', () => {
    expect(config.source).toBe('source');
    expect(config.destination).toBe('_site');
  });

  test('should have author information', () => {
    expect(configContent).toContain('author:');
    expect(configContent).toContain('name: mvieira');
    expect(configContent).toContain('email: matheus.costa.vieira@gmail.com');
  });

  test('should have navbar configuration', () => {
    expect(configContent).toContain('navbar:');
    expect(configContent).toContain('about');
    expect(configContent).toContain('blog');
    expect(configContent).toContain('contact');
    expect(configContent).toContain('resume');
  });

  test('should have proper Jekyll plugins', () => {
    expect(configContent).toContain('plugins:');
    expect(configContent).toContain('jekyll-paginate');
  });

  test('should have Google Analytics configured', () => {
    expect(config.google_analytics).toBeTruthy();
    expect(config.google_analytics_container).toBeTruthy();
  });
});

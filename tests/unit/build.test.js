/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Jekyll Build Configuration Tests', () => {
  let config;
  const configPath = path.join(__dirname, '../../_config.yml');
  const sitePath = path.join(__dirname, '../../_site');
  
  beforeAll(() => {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      config = yaml.load(configContent);
    } catch (error) {
      console.error('Error loading _config.yml:', error);
    }
  });

  test('should have valid Jekyll configuration file', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  test('should have correct source and destination paths', () => {
    expect(config.source).toBe('source');
    expect(config.destination).toBe('_site');
  });

  test('should have performance optimizations configured', () => {
    expect(config.incremental).toBe(false);
    expect(config.sass).toBeDefined();
    expect(config.sass.style).toBe('compressed');
    expect(config.sass.cache).toBe(true);
  });

  test('should have HTML compression configured', () => {
    expect(config.compress_html).toBeDefined();
    expect(config.compress_html.clippings).toBe('all');
    expect(config.compress_html.blanklines).toBe(false);
  });

  test('should exclude unnecessary files from build', () => {
    expect(config.exclude).toBeDefined();
    expect(Array.isArray(config.exclude)).toBe(true);
    expect(config.exclude).toContain('node_modules');
    expect(config.exclude).toContain('vendor');
    expect(config.exclude).toContain('.git');
    expect(config.exclude).toContain('Gemfile');
  });

  test('should have collections properly configured', () => {
    expect(config.collections).toBeDefined();
    expect(config.collections.graduations).toBeDefined();
    expect(config.collections.languages).toBeDefined();
    expect(config.collections.experiences).toBeDefined();
    expect(config.collections.skills).toBeDefined();
    expect(config.collections.interview_questions).toBeDefined();
    expect(config.collections.interview_questions.output).toBe(true);
  });

  test('should have plugins configured', () => {
    expect(config.plugins).toBeDefined();
    expect(Array.isArray(config.plugins)).toBe(true);
    expect(config.plugins).toContain('jekyll-paginate');
  });

  test('should have pagination configured', () => {
    expect(config.paginate).toBe(10);
    expect(config.paginate_path).toBe('/blog/page/:num/');
  });
});
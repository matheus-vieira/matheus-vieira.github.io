/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Comprehensive Build Configuration Tests', () => {
  let config;
  const configPath = path.join(__dirname, '../../_config.yml');
  
  beforeAll(() => {
    try {
      const configContent = fs.readFileSync(configPath, 'utf8');
      config = yaml.load(configContent);
    } catch (error) {
      console.error('Error loading _config.yml:', error);
    }
  });

  describe('Performance Optimizations', () => {
    test('should have incremental build disabled for better performance', () => {
      expect(config.incremental).toBe(false);
    });

    test('should have SASS optimizations configured', () => {
      expect(config.sass).toBeDefined();
      expect(config.sass.style).toBe('compressed');
      expect(config.sass.cache).toBe(true);
      expect(config.sass.sass_dir).toBe('_sass');
      expect(Array.isArray(config.sass.load_paths)).toBe(true);
    });

    test('should have HTML compression configured', () => {
      expect(config.compress_html).toBeDefined();
      expect(config.compress_html.clippings).toBe('all');
      expect(config.compress_html.blanklines).toBe(false);
      expect(config.compress_html.profile).toBe(false);
    });

    test('should have liquid optimizations for strict error handling', () => {
      expect(config.liquid).toBeDefined();
      expect(config.liquid.error_mode).toBe('strict');
      expect(config.liquid.strict_filters).toBe(true);
      expect(config.liquid.strict_variables).toBe(true);
    });
  });

  describe('File Exclusions', () => {
    test('should exclude development files', () => {
      expect(config.exclude).toContain('Gemfile');
      expect(config.exclude).toContain('Gemfile.lock');
      expect(config.exclude).toContain('package.json');
      expect(config.exclude).toContain('node_modules');
      expect(config.exclude).toContain('.env');
    });

    test('should exclude build artifacts', () => {
      expect(config.exclude).toContain('*.log');
      expect(config.exclude).toContain('*.tmp');
      expect(config.exclude).toContain('*.bak');
    });

    test('should exclude documentation and config files', () => {
      expect(config.exclude).toContain('README.md');
      expect(config.exclude).toContain('SECURITY.md');
      expect(config.exclude).toContain('install.sh');
    });
  });

  describe('Collections Configuration', () => {
    test('should configure collections with proper output settings', () => {
      expect(config.collections.graduations.output).toBe(false);
      expect(config.collections.languages.output).toBe(false);
      expect(config.collections.experiences.output).toBe(false);
      expect(config.collections.skills.output).toBe(false);
      expect(config.collections.interview_questions.output).toBe(true);
    });

    test('should have proper permalink for interview questions', () => {
      expect(config.collections.interview_questions.permalink).toBe('/interview_questions/:name/');
    });
  });

  describe('SEO and Analytics', () => {
    test('should have Google Analytics configured', () => {
      expect(config.google_analytics).toBe('UA-174941014-1');
      expect(config.google_analytics_container).toBe('GTM-TWNMZ5Q');
    });

    test('should have proper SEO meta information', () => {
      expect(config.title).toContain('Matheus Costa Vieira');
      expect(config.description).toBeDefined();
      expect(config.keywords).toBeDefined();
      expect(config.url).toBe('http://matheus-vieira.github.io');
    });

    test('should have Disqus configuration', () => {
      expect(config.disqus_shortname).toBe('matheuscostavieira');
      expect(config.disqus_site_shortname).toBe('matheuscostavieira');
    });
  });

  describe('Build Safety and Profiling', () => {
    test('should have safe mode disabled for plugins', () => {
      expect(config.safe).toBe(false);
    });

    test('should have profiling disabled for production', () => {
      expect(config.profile).toBe(false);
    });

    test('should have keep_files configuration', () => {
      expect(config.keep_files).toBeDefined();
      expect(config.keep_files).toContain('.git');
      expect(config.keep_files).toContain('.nojekyll');
    });
  });
});
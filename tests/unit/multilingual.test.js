/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Multilingual Configuration Tests', () => {
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

  test('should have multilingual messages configured', () => {
    expect(config.messages).toBeDefined();
    expect(typeof config.messages).toBe('object');
  });

  test('should have Portuguese (pt-br) messages', () => {
    expect(config.messages['pt-br']).toBeDefined();
    expect(config.messages['pt-br']['page-title']).toBe('Currículo');
    expect(config.messages['pt-br']['print-alert']).toBeDefined();
  });

  test('should have English (en-us) messages', () => {
    expect(config.messages['en-us']).toBeDefined();
    expect(config.messages['en-us']['page-title']).toBe('Resume');
    expect(config.messages['en-us']['print-alert']).toBeDefined();
  });

  test('should have consistent message structure between languages', () => {
    const ptMessages = config.messages['pt-br'];
    const enMessages = config.messages['en-us'];
    
    // Check that both languages have the same structure
    expect(ptMessages['print-resume']).toBeDefined();
    expect(enMessages['print-resume']).toBeDefined();
    
    // Check title structures
    expect(ptMessages['print-resume']['title']).toBeDefined();
    expect(enMessages['print-resume']['title']).toBeDefined();
    
    // Check core competencies
    expect(ptMessages['print-resume']['core-competencies-title']).toBeDefined();
    expect(enMessages['print-resume']['core-competencies-title']).toBeDefined();
  });

  test('should have professional summary in both languages', () => {
    const ptGoal = config.messages['pt-br']['print-resume']['goal'];
    const enGoal = config.messages['en-us']['print-resume']['goal'];
    
    expect(ptGoal).toBeDefined();
    expect(enGoal).toBeDefined();
    expect(ptGoal.length).toBeGreaterThan(100);
    expect(enGoal.length).toBeGreaterThan(100);
  });

  test('should have technical skills defined in both languages', () => {
    const ptResume = config.messages['pt-br']['print-resume'];
    const enResume = config.messages['en-us']['print-resume'];
    
    expect(ptResume['backend-development']).toBeDefined();
    expect(enResume['backend-development']).toBeDefined();
    expect(ptResume['frontend-development']).toBeDefined();
    expect(enResume['frontend-development']).toBeDefined();
    expect(ptResume['cloud-devops']).toBeDefined();
    expect(enResume['cloud-devops']).toBeDefined();
  });

  test('should have skill categories properly translated', () => {
    const ptTitle = config.messages['pt-br']['print-resume']['title'];
    const enTitle = config.messages['en-us']['print-resume']['title'];
    
    // Check if skill categories exist in both languages
    expect(ptTitle['skills-languages']).toBe('Linguagens');
    expect(enTitle['skills-languages']).toBe('Languages');
    
    expect(ptTitle['skills-cloud']).toBe('Provedores de Nuvem');
    expect(enTitle['skills-cloud']).toBe('Cloud Providers');
    
    expect(ptTitle['skills-framework']).toBe('Frameworks');
    expect(enTitle['skills-framework']).toBe('Frameworks');
  });
});
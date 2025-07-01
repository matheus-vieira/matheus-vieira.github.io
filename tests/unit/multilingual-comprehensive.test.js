/**
 * @jest-environment node
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

describe('Comprehensive Multilingual Tests', () => {
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

  describe('Language Structure Validation', () => {
    test('should have complete message structure for both languages', () => {
      const supportedLanguages = ['pt-br', 'en-us'];
      
      supportedLanguages.forEach(lang => {
        expect(config.messages[lang]).toBeDefined();
        expect(config.messages[lang]['page-title']).toBeDefined();
        expect(config.messages[lang]['print-alert']).toBeDefined();
        expect(config.messages[lang]['print-resume']).toBeDefined();
      });
    });

    test('should have consistent title structures across languages', () => {
      const ptTitles = config.messages['pt-br']['print-resume']['title'];
      const enTitles = config.messages['en-us']['print-resume']['title'];
      
      const requiredTitleKeys = [
        'goal', 'education', 'courses', 'experiences', 'institution',
        'skills', 'course', 'company', 'current', 'skills-idiom',
        'skills-languages', 'skills-cloud', 'skills-framework', 'skills-others'
      ];
      
      requiredTitleKeys.forEach(key => {
        expect(ptTitles[key]).toBeDefined();
        expect(enTitles[key]).toBeDefined();
      });
    });
  });

  describe('Professional Content Translation', () => {
    test('should have professional goals translated correctly', () => {
      const ptGoals = config.messages['pt-br']['print-resume']['professional-goals'];
      const enGoals = config.messages['en-us']['print-resume']['professional-goals'];
      
      expect(ptGoals).toBeDefined();
      expect(enGoals).toBeDefined();
      expect(ptGoals).toContain('Projetar soluções inovadoras');
      expect(enGoals).toContain('To design innovative solutions');
    });

    test('should have technical skills consistently translated', () => {
      const ptResume = config.messages['pt-br']['print-resume'];
      const enResume = config.messages['en-us']['print-resume'];
      
      const skillCategories = [
        'backend-development', 'frontend-development', 'cloud-devops',
        'databases', 'messaging-caching', 'testing-quality',
        'observability', 'version-control'
      ];
      
      skillCategories.forEach(category => {
        expect(ptResume[category]).toBeDefined();
        expect(enResume[category]).toBeDefined();
      });
      
      // Check specific technologies in appropriate categories
      expect(ptResume['backend-development']).toContain('.NET');
      expect(enResume['backend-development']).toContain('.NET');
      expect(ptResume['frontend-development']).toContain('JavaScript');
      expect(enResume['frontend-development']).toContain('JavaScript');
    });
  });

  describe('Skill Categories Translation', () => {
    test('should have proper skill category translations', () => {
      const ptTitles = config.messages['pt-br']['print-resume']['title'];
      const enTitles = config.messages['en-us']['print-resume']['title'];
      
      expect(ptTitles['backend-development']).toBe('Desenvolvimento Backend');
      expect(enTitles['backend-development']).toBe('Backend Development');
      
      expect(ptTitles['frontend-development']).toBe('Desenvolvimento Frontend');
      expect(enTitles['frontend-development']).toBe('Frontend Development');
      
      expect(ptTitles['cloud-devops']).toBe('Nuvem e DevOps');
      expect(enTitles['cloud-devops']).toBe('Cloud & DevOps');
    });

    test('should have database and messaging translations', () => {
      const ptTitles = config.messages['pt-br']['print-resume']['title'];
      const enTitles = config.messages['en-us']['print-resume']['title'];
      
      expect(ptTitles['databases']).toBe('Banco de Dados');
      expect(enTitles['databases']).toBe('Databases');
      
      expect(ptTitles['messaging-caching']).toBe('Mensageria e Cache');
      expect(enTitles['messaging-caching']).toBe('Messaging & Caching');
    });
  });

  describe('Technical Skills Content Validation', () => {
    test('should have comprehensive backend development skills', () => {
      const ptBackend = config.messages['pt-br']['print-resume']['backend-development'];
      const enBackend = config.messages['en-us']['print-resume']['backend-development'];
      
      const expectedTechnologies = ['.NET 8', '.NET Core', 'Entity Framework Core', 'C#', 'Java', 'Python'];
      
      expectedTechnologies.forEach(tech => {
        expect(ptBackend).toContain(tech);
        expect(enBackend).toContain(tech);
      });
    });

    test('should have comprehensive frontend development skills', () => {
      const ptFrontend = config.messages['pt-br']['print-resume']['frontend-development'];
      const enFrontend = config.messages['en-us']['print-resume']['frontend-development'];
      
      const expectedFrontendTech = ['AngularJS', 'ReactJS', 'VueJS', 'JavaScript', 'HTML5', 'CSS3'];
      
      expectedFrontendTech.forEach(tech => {
        expect(ptFrontend).toContain(tech);
        expect(enFrontend).toContain(tech);
      });
    });

    test('should have comprehensive cloud and DevOps skills', () => {
      const ptCloud = config.messages['pt-br']['print-resume']['cloud-devops'];
      const enCloud = config.messages['en-us']['print-resume']['cloud-devops'];
      
      expect(ptCloud).toContain('Azure');
      expect(ptCloud).toContain('Functions');
      expect(ptCloud).toContain('CI/CD');
      expect(ptCloud).toContain('GitHub Actions');
      
      expect(enCloud).toContain('Azure');
      expect(enCloud).toContain('Functions');
      expect(enCloud).toContain('CI/CD');
      expect(enCloud).toContain('GitHub Actions');
    });
  });

  describe('Location and Contact Information', () => {
    test('should have proper location information', () => {
      const ptLocation = config.messages['pt-br']['print-resume']['location'];
      const enLocation = config.messages['en-us']['print-resume']['location'];
      
      expect(ptLocation).toBe('São Paulo - SP - Brasil');
      expect(enLocation).toBe('São Paulo - SP - Brazil');
    });

    test('should have core competencies title translated', () => {
      const ptCompetencies = config.messages['pt-br']['print-resume']['core-competencies-title'];
      const enCompetencies = config.messages['en-us']['print-resume']['core-competencies-title'];
      
      expect(ptCompetencies).toBe('Competências Essenciais');
      expect(enCompetencies).toBe('Core Competencies');
    });
  });

  describe('Quality Assurance Content', () => {
    test('should have testing and quality practices in both languages', () => {
      const ptTesting = config.messages['pt-br']['print-resume']['testing-quality'];
      const enTesting = config.messages['en-us']['print-resume']['testing-quality'];
      
      expect(ptTesting).toContain('Unit Testing');
      expect(ptTesting).toContain('SOLID');
      expect(ptTesting).toContain('Design Patterns');
      
      expect(enTesting).toContain('Unit Testing');
      expect(enTesting).toContain('SOLID');
      expect(enTesting).toContain('Design Patterns');
    });

    test('should have observability tools in both languages', () => {
      const ptObservability = config.messages['pt-br']['print-resume']['observability'];
      const enObservability = config.messages['en-us']['print-resume']['observability'];
      
      expect(ptObservability).toContain('Serilog');
      expect(ptObservability).toContain('ELK Stack');
      expect(ptObservability).toContain('Application Insights');
      
      expect(enObservability).toContain('Serilog');
      expect(enObservability).toContain('ELK Stack');
      expect(enObservability).toContain('Application Insights');
    });
  });
});
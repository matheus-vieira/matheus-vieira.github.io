// Simple test to validate our multilanguage structure
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const siteDir = '../_site';
const expectedFiles = [
  'index.html',
  'pt-br.html', 
  'sobre.html',
  'about.html',
  'contato.html',
  'contact.html',
  'cursos.html',
  'courses.html',
  'curriculo.html',
  'resume.html',
  'postagens.html',
  'estudos.html'
];

console.log('🔍 Validating multilanguage file structure...\n');

let allTestsPassed = true;

// Test 1: Check if expected files exist
console.log('📁 Testing file existence:');
expectedFiles.forEach(file => {
  const filePath = join(siteDir, file);
  const exists = existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allTestsPassed = false;
});

// Test 2: Check if main pages have proper language links
console.log('\n🔗 Testing language links:');
const mainPages = [
  { en: 'about.html', pt: 'sobre.html' },
  { en: 'contact.html', pt: 'contato.html' },
  { en: 'courses.html', pt: 'cursos.html' },
  { en: 'resume.html', pt: 'curriculo.html' }
];

mainPages.forEach(({ en, pt }) => {
  try {
    const enPath = join(siteDir, en);
    const ptPath = join(siteDir, pt);
    
    if (existsSync(enPath) && existsSync(ptPath)) {
      const enContent = readFileSync(enPath, 'utf8');
      const ptContent = readFileSync(ptPath, 'utf8');
      
      // Check if both files have different content (indicating they're properly localized)
      const contentDiffers = enContent !== ptContent;
      const hasTitleTag = enContent.includes('<title>') && ptContent.includes('<title>');
      
      console.log(`  ${contentDiffers && hasTitleTag ? '✅' : '❌'} ${en} ↔ ${pt}`);
      if (!contentDiffers || !hasTitleTag) allTestsPassed = false;
    }
  } catch (error) {
    console.log(`  ❌ Error reading ${en} ↔ ${pt}: ${error.message}`);
    allTestsPassed = false;
  }
});

// Test 3: Check URL structure in built files
console.log('\n📍 Testing URL structure:');
const testUrls = [
  { file: 'sobre.html', expectedUrl: '/sobre' },
  { file: 'contato.html', expectedUrl: '/contato' },
  { file: 'cursos.html', expectedUrl: '/cursos' },
  { file: 'curriculo.html', expectedUrl: '/curriculo' }
];

testUrls.forEach(({ file, expectedUrl }) => {
  try {
    const filePath = join(siteDir, file);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf8');
      const hasCorrectUrl = content.includes(expectedUrl);
      console.log(`  ${hasCorrectUrl ? '✅' : '❌'} ${file} → ${expectedUrl}`);
      if (!hasCorrectUrl) allTestsPassed = false;
    }
  } catch (error) {
    console.log(`  ❌ Error checking ${file}: ${error.message}`);
    allTestsPassed = false;
  }
});

console.log(`\n${allTestsPassed ? '🎉' : '❌'} Overall result: ${allTestsPassed ? 'PASSED' : 'FAILED'}`);

if (!allTestsPassed) {
  console.log('\n💡 Some tests failed. This might indicate:');
  console.log('   - The site needs to be rebuilt with Jekyll');
  console.log('   - Some configuration changes haven\'t been applied');
  console.log('   - Missing or incorrectly configured files');
}

process.exit(allTestsPassed ? 0 : 1);

// Manual test runner for multilanguage validation
import { chromium } from 'playwright';

async function runTests() {
  console.log('🚀 Starting multilanguage validation tests...\n');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  let allTestsPassed = true;
  
  try {
    // Test 1: Check if main pages load
    console.log('📄 Testing page loading:');
    const urlTests = [
      { url: 'http://localhost:4000/', name: 'Home (EN)' },
      { url: 'http://localhost:4000/pt-br', name: 'Home (PT)' },
      { url: 'http://localhost:4000/about.html', name: 'About (EN)' },
      { url: 'http://localhost:4000/sobre', name: 'About (PT)' },
      { url: 'http://localhost:4000/contact.html', name: 'Contact (EN)' },
      { url: 'http://localhost:4000/contato', name: 'Contact (PT)' },
      { url: 'http://localhost:4000/courses.html', name: 'Courses (EN)' },
      { url: 'http://localhost:4000/cursos', name: 'Courses (PT)' },
      { url: 'http://localhost:4000/resume.html', name: 'Resume (EN)' },
      { url: 'http://localhost:4000/curriculo', name: 'Resume (PT)' }
    ];
    
    for (const { url, name } of urlTests) {
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        const isOk = response && response.status() < 400;
        const title = await page.title();
        const hasContent = title && title.length > 0;
        
        console.log(`  ${isOk && hasContent ? '✅' : '❌'} ${name} - ${url}`);
        if (!isOk || !hasContent) {
          allTestsPassed = false;
          console.log(`    Status: ${response?.status()}, Title: "${title}"`);
        }
      } catch (error) {
        console.log(`  ❌ ${name} - ERROR: ${error.message}`);
        allTestsPassed = false;
      }
    }
    
    // Test 2: Check language switcher functionality
    console.log('\n🔄 Testing language switching:');
    
    try {
      // Start with English About page
      await page.goto('http://localhost:4000/about.html', { waitUntil: 'networkidle' });
      const enTitle = await page.title();
      
      // Look for language switcher
      const languageLink = await page.locator('a[href*="sobre"]').first();
      if (await languageLink.count() > 0) {
        await languageLink.click();
        await page.waitForLoadState('networkidle');
        
        const ptTitle = await page.title();
        const currentUrl = page.url();
        
        const switchedSuccessfully = currentUrl.includes('sobre') && ptTitle !== enTitle;
        console.log(`  ${switchedSuccessfully ? '✅' : '❌'} EN→PT switching (about → sobre)`);
        if (!switchedSuccessfully) {
          allTestsPassed = false;
          console.log(`    Current URL: ${currentUrl}, EN Title: "${enTitle}", PT Title: "${ptTitle}"`);
        }
      } else {
        console.log(`  ❌ Language switcher not found on about page`);
        allTestsPassed = false;
      }
    } catch (error) {
      console.log(`  ❌ Language switching test failed: ${error.message}`);
      allTestsPassed = false;
    }
    
    // Test 3: Check navigation consistency
    console.log('\n🧭 Testing navigation:');
    
    try {
      await page.goto('http://localhost:4000/', { waitUntil: 'networkidle' });
      
      const navLinks = await page.locator('nav a').all();
      console.log(`  ✅ Found ${navLinks.length} navigation links`);
      
      // Check if main navigation links exist
      const expectedNavItems = ['about', 'blog', 'contact', 'courses', 'resume', 'study'];
      for (const item of expectedNavItems) {
        const linkExists = await page.locator(`nav a[href*="${item}"]`).count() > 0;
        console.log(`  ${linkExists ? '✅' : '❌'} Navigation link: ${item}`);
        if (!linkExists) allTestsPassed = false;
      }
      
    } catch (error) {
      console.log(`  ❌ Navigation test failed: ${error.message}`);
      allTestsPassed = false;
    }
    
  } catch (error) {
    console.log(`❌ Test execution failed: ${error.message}`);
    allTestsPassed = false;
  } finally {
    await browser.close();
  }
  
  console.log(`\n${allTestsPassed ? '🎉' : '❌'} Overall result: ${allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
  
  if (!allTestsPassed) {
    console.log('\n💡 Next steps:');
    console.log('   - Rebuild the Jekyll site to apply config changes');
    console.log('   - Check server is running on http://localhost:4000');
    console.log('   - Verify language switcher links in template files');
  }
  
  return allTestsPassed;
}

runTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Test runner failed:', error);
  process.exit(1);
});

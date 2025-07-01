#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Running Test Suite for Matheus Vieira\'s Website');
console.log('='.repeat(50));

const testTypes = [
  { name: 'Unit Tests', command: 'npx jest unit/ --verbose' },
  { name: 'Functional Tests', command: 'npx playwright test functional/' },
  { name: 'Integration Tests', command: 'npx playwright test integration/' }
];

async function runTests() {
  for (const test of testTypes) {
    console.log(`\n🔬 Running ${test.name}...`);
    console.log('-'.repeat(30));
    
    try {
      const output = execSync(test.command, { 
        cwd: __dirname,
        encoding: 'utf8',
        stdio: 'inherit'
      });
      console.log(`✅ ${test.name} completed successfully!`);
    } catch (error) {
      console.error(`❌ ${test.name} failed!`);
      console.error(error.message);
      process.exit(1);
    }
  }
  
  console.log('\n🎉 All tests completed successfully!');
}

runTests().catch(console.error);

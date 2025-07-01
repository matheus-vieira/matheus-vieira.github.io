#!/usr/bin/env node

/**
 * Test Runner with Enhanced Reporting
 * Executes all test suites and generates comprehensive reports
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure test-results directory exists
const resultsDir = './test-results';
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

console.log('🧪 Starting Comprehensive Test Suite Execution...\n');

// Function to execute command and capture output
function executeTest(testType, command) {
  console.log(`\n🔬 Running ${testType} tests...`);
  console.log('=' + '='.repeat(50));
  
  const startTime = Date.now();
  let success = false;
  let output = '';
  
  try {
    output = execSync(command, { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 300000 // 5 minutes timeout
    });
    success = true;
    console.log(`✅ ${testType} tests completed successfully`);
  } catch (error) {
    output = error.stdout + error.stderr;
    console.log(`❌ ${testType} tests failed`);
    console.log('Error:', error.message);
  }
  
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Save detailed log
  const logFile = path.join(resultsDir, `${testType.toLowerCase()}-test-log.txt`);
  const logContent = `
${testType.toUpperCase()} TEST EXECUTION LOG
========================================
Execution Time: ${new Date().toISOString()}
Duration: ${duration}ms
Success: ${success}
Command: ${command}

OUTPUT:
${output}

END OF LOG
`;
  
  fs.writeFileSync(logFile, logContent);
  
  return {
    testType,
    success,
    duration,
    output,
    logFile
  };
}

// Test execution plan
const testPlan = [
  {
    name: 'Unit',
    command: 'npm run test:unit'
  },
  {
    name: 'Functional',
    command: 'npm run test:functional'
  },
  {
    name: 'Integration', 
    command: 'npm run test:integration'
  }
];

// Execute all tests
const results = [];
let totalStartTime = Date.now();

for (const test of testPlan) {
  const result = executeTest(test.name, test.command);
  results.push(result);
}

let totalEndTime = Date.now();
let totalDuration = totalEndTime - totalStartTime;

// Generate summary report
console.log('\n📊 TEST EXECUTION SUMMARY');
console.log('=' + '='.repeat(50));

const summary = {
  timestamp: new Date().toISOString(),
  totalDuration: totalDuration,
  totalTests: results.length,
  passed: results.filter(r => r.success).length,
  failed: results.filter(r => !r.success).length,
  results: results
};

results.forEach(result => {
  const status = result.success ? '✅ PASS' : '❌ FAIL';
  const duration = `${result.duration}ms`;
  console.log(`${status} ${result.testType.padEnd(12)} ${duration.padStart(8)}`);
});

console.log(`\n🎯 Overall: ${summary.passed}/${summary.totalTests} test suites passed`);
console.log(`⏱️  Total execution time: ${totalDuration}ms`);

// Save summary as JSON
const summaryFile = path.join(resultsDir, 'test-execution-summary.json');
fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

// Generate HTML report
const htmlReport = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Execution Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }
        .success { color: #28a745; }
        .failure { color: #dc3545; }
        .test-result { margin: 10px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .duration { float: right; color: #666; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 3px; overflow-x: auto; }
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat { padding: 10px; background: #e9ecef; border-radius: 5px; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 Test Execution Report</h1>
        <p><strong>Executed:</strong> ${summary.timestamp}</p>
        <p><strong>Total Duration:</strong> ${totalDuration}ms</p>
    </div>
    
    <div class="stats">
        <div class="stat">
            <h3>${summary.totalTests}</h3>
            <p>Total Test Suites</p>
        </div>
        <div class="stat">
            <h3 class="success">${summary.passed}</h3>
            <p>Passed</p>
        </div>
        <div class="stat">
            <h3 class="failure">${summary.failed}</h3>
            <p>Failed</p>
        </div>
    </div>
    
    <h2>📋 Detailed Results</h2>
    ${results.map(result => `
        <div class="test-result">
            <h3 class="${result.success ? 'success' : 'failure'}">
                ${result.success ? '✅' : '❌'} ${result.testType} Tests
                <span class="duration">${result.duration}ms</span>
            </h3>
            <p><strong>Status:</strong> ${result.success ? 'PASSED' : 'FAILED'}</p>
            <p><strong>Log File:</strong> ${result.logFile}</p>
            <details>
                <summary>Show Output</summary>
                <pre>${result.output.substring(0, 5000)}${result.output.length > 5000 ? '...\n[Output truncated]' : ''}</pre>
            </details>
        </div>
    `).join('')}
    
    <div class="header" style="margin-top: 30px;">
        <p><em>Report generated by Test Runner v1.0</em></p>
    </div>
</body>
</html>
`;

const htmlFile = path.join(resultsDir, 'test-execution-report.html');
fs.writeFileSync(htmlFile, htmlReport);

console.log(`\n📄 Reports generated:`);
console.log(`   📊 Summary: ${summaryFile}`);
console.log(`   📝 HTML Report: ${htmlFile}`);
console.log(`   📋 Individual logs in: ${resultsDir}/`);

// Exit with appropriate code
const exitCode = summary.failed > 0 ? 1 : 0;
console.log(`\n${exitCode === 0 ? '🎉 All tests passed!' : '⚠️  Some tests failed!'}`);
process.exit(exitCode);

#!/usr/bin/env node

// Verificador de status dos testes
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando status do conjunto de testes...\n');

// Verificar estrutura de diretórios
const testDirs = ['unit', 'functional', 'integration'];
const requiredFiles = [
  'package.json',
  'jest.config.js',
  'playwright.config.js',
  'setup-tests.js'
];

console.log('📁 Verificando estrutura de diretórios:');
testDirs.forEach(dir => {
  const exists = fs.existsSync(dir);
  console.log(`  ${exists ? '✅' : '❌'} ${dir}/`);
  if (exists) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      console.log(`    📄 ${file}`);
    });
  }
});

console.log('\n📄 Verificando arquivos de configuração:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Verificar node_modules
const nodeModulesExists = fs.existsSync('node_modules');
console.log(`\n📦 node_modules: ${nodeModulesExists ? '✅ Instalado' : '❌ Não encontrado'}`);

// Contagem de testes
let totalTests = 0;
testDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.test.js') || f.endsWith('.spec.js'));
    totalTests += files.length;
    console.log(`\n🧪 ${dir}: ${files.length} arquivo(s) de teste`);
  }
});

console.log(`\n📊 Total de arquivos de teste: ${totalTests}`);

// Status final
console.log('\n🎯 Status da implementação:');
const allDirsExist = testDirs.every(dir => fs.existsSync(dir));
const allConfigsExist = requiredFiles.every(file => fs.existsSync(file));

if (allDirsExist && allConfigsExist && nodeModulesExists && totalTests > 0) {
  console.log('✅ Suite de testes PRONTA para execução!');
  console.log('\n🚀 Para executar os testes:');
  console.log('   npm run test:unit      - Testes unitários');
  console.log('   npm run test:functional - Testes funcionais');
  console.log('   npm run test:integration - Testes de integração');
  console.log('   npm test               - Todos os testes');
} else {
  console.log('❌ Suite de testes INCOMPLETA. Verifique os itens marcados acima.');
}

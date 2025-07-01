module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-tests.js'],
  testMatch: [
    '<rootDir>/unit/**/*.test.js'
  ],
  collectCoverageFrom: [
    'unit/**/*.js',
    '!**/node_modules/**'
  ],
  verbose: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'unit-test-results.xml',
      suiteNameTemplate: '{filepath}',
      classNameTemplate: '{classname}',
      titleTemplate: '{title}'
    }]
  ]
};
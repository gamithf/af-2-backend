module.exports = {
    testEnvironment: 'node', // Test environment for Node.js
    coverageDirectory: 'coverage', // Directory for coverage reports
    collectCoverageFrom: ['src/**/*.js'], // Collect coverage from these files
    testPathIgnorePatterns: ['/node_modules/'], // Ignore tests in node_modules
  };
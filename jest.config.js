module.exports = {
  roots: ['<rootDir>/tests'],
  preset: 'ts-jest',
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  moduleNameMapper: {
    'src/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/tests/schemas/',
    '<rootDir>/tests/matchers/',
    '<rootDir>/tests/fixtures/',
  ],
};

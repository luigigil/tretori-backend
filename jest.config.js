module.exports = {
  //   setupFilesAfterEnv: ['./src/shared/test/setup.ts', 'jest-extended/all'],
  rootDir: './',
  collectCoverageFrom: ['src/**/*.ts', '!**/main.ts', '!**/tests/**/*.ts', '!**/migrations/*.ts'],
  coverageReporters: ['html', 'text'],
  modulePaths: ['<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRunner: 'jest-circus/runner',
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
}

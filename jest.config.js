module.exports = {
  //   setupFilesAfterEnv: ['./src/shared/test/setup.ts', 'jest-extended/all'],
  collectCoverageFrom: ['src/**/*.ts', '!**/main.ts', '!**/tests/**/*.ts', '!**/migrations/*.ts'],
  coverageReporters: ['html', 'text'],
  modulePaths: ['<rootDir>/src'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRunner: 'jest-circus/runner',
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
}

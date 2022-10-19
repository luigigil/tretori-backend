module.exports = {
  //   setupFilesAfterEnv: ['./src/shared/test/setup.ts', 'jest-extended/all'],
  collectCoverageFrom: [
    './src/**/*.ts',
    '!**/main.ts',
    '!**/constants.ts',
    '!**/tests/**/*.ts',
    '!**/auth/strategies/*.ts',
    '!**/(migrations|fixtures)/*.ts',
    '!**/*.(entity|guard|decorator|enum|constants|types|module).ts',
  ],
  coverageReporters: ['html', 'text'],
  modulePaths: ['<rootDir>/src', '<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRunner: 'jest-circus/runner',
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
}

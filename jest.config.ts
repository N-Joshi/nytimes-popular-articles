import type { JestConfigWithTsJest } from 'ts-jest';
const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/test'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePaths: ['<rootDir>/src'], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^axios$': '<rootDir>/node_modules/axios/dist/axios.js',
    // Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: { 'ts-jest': { tsconfig: './tsconfig.json' } },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  clearMocks: true,
  verbose: true,
  testTimeout: 30000,
};

export default jestConfig;

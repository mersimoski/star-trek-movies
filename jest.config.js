module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$|@ionic/core|@stencil/core|ionicons)'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    testEnvironment: 'jsdom',
  };
  
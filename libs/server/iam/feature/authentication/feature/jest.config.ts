/* eslint-disable */
export default {
  displayName: 'server-iam-feature-authentication-feature',
  preset: '../../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../../coverage/libs/server/iam/feature/authentication/feature',
};

module.exports = {
  preset: 'react-native',
  timers: 'fake',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  transformIgnorePatterns: [],
  transform: {
    '^.+\\.jsx$': 'babel-jest',
  },
};

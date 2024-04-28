// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/mockFile.js',
    '\\.(css|less)$': '<rootDir>/mockFile.js',
  },
};

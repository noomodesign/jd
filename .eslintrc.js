module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: '@babel/eslint-parser',
  ignorePatterns: ['src/assets/js/vendors/', 'node_modules/'],
  extends: ['prettier'],
  plugins: ['prettier'],
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-plusplus': ['off'],
    'func-names': ['off'],
    'no-console': ['off'],
    'import/order': ['off'],
    'no-unused-expressions': ['off'],
  },
};

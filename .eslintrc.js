module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['prettier'],
  rules: {
    'react/no-unstable-nested-components': 'off',
    'no-proto': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'comma-dangle': 'off',
    'array-bracket-spacing': 2,
    'block-spacing': 2,
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        colon: 'none',
        bracketSpacing: true
      }
    ]
  }
};

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    node: true,
    mocha: true,
    es6: true
  },
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  // 自定义规则
  rules: {
    'no-undef': 'off'
  }
}

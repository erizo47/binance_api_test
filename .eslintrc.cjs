/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    'vue/setup-compiler-macros': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'airbnb-base',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-essential',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-shadow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-prototype-builtins': 0,
    'no-param-reassign': ['error', { props: false }],
    'prefer-destructuring': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }],
    'max-len': ['error', { code: 160 }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'vue/script-indent': ['error', 2, {
          baseIndent: 1,
          switchCase: 0,
          ignores: [],
        }],
        'vue/multi-word-component-names': ['error', {
          ignores: ['index'],
        }],
        'import/no-unresolved': 'off',
        'prefer-destructuring': 'off',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'max-len': ['error', { code: 160 }],
        'import/extensions': 'off',
        'no-prototype-builtins': 0,
        'no-param-reassign': ['error', { props: false }],
      },
      extends: [
        'plugin:vue/vue3-recommended',
        'airbnb-base',
      ],
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base',
      ],
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.json'],
        parser: require.resolve('@typescript-eslint/parser'),
        sourceType: 'module',
      },
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-unsafe-argument': 'warn',
        'import/extensions': 'off',
        "@typescript-eslint/no-useless-constructor": 0
      },
    },
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
};

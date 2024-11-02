import antfu from '@antfu/eslint-config'
// import { FlatCompat } from '@eslint/eslintrc'

// const compat = new FlatCompat()

export default antfu(
  {
    formatters: true,
    react: true,
  },
  {
    ignores: [
      'components/ui/**/*',
      'components/magicui/**/*',
      'components/animata/**/*',
      'components/cute/**/*',
      'components/eldora/**/*',
    ],
  },
  {
    rules: {
      'no-console': ['error', { allow: ['info', 'table', 'warn', 'error'] }],
      'node/prefer-global/process': 'off',
      'import/no-webpack-loader-syntax': 'off',
      'ts/no-namespace': 'off',
      'react-dom/no-dangerously-set-innerhtml': 'off',
      'react-dom/no-unsafe-target-blank': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/rules-of-hooks': 'off',
      'regexp/no-unused-capturing-group': 'off',
      'unicorn/prefer-node-protocol': 'off',
    },
  },
)

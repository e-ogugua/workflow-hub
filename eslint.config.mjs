import js from '@eslint/js'
import globals from 'globals'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020
      },
      parser: tsParser,
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'dist/**',
      'node_modules/**',
      'monitoring.config.js',
      'pages/**',
      'tests/**',
      'coverage/**',
      '.next/**',
      '**/*.css' // Exclude CSS files completely
    ],
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      // Allow TypeScript interfaces and React JSX
      'no-unused-vars': 'off', // TypeScript handles this better
      'no-undef': 'off', // TypeScript handles this better
    },
  },
]

import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser
    },
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**'],
    rules: {
      ...js.configs.recommended.rules,
    },
  },
]

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      '@stylistic': stylistic,
    },
    settings: {
      react: { version: 'detect' }, 
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'], 
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'import/no-unresolved': 'error',

      ...stylistic.configs['recommended-extends'].rules,

      '@typescript-eslint/no-empty-function': 'off',
      '@stylistic/max-len': ['error', { 'code': 120 }],
      'import/order':  [
          1, 
          {  
            'groups': [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index' ], 
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          } 
      ],
    },
  },

);
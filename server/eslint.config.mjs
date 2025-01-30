import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      import: importPlugin,
      '@stylistic': stylistic,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'], // doesn't require such extensions at the end of import
        },
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      ...stylistic.configs['recommended-extends'].rules,

      '@stylistic/max-len': ['error', { 'code': 120 }],
      'import/order':  [1, {  
            'groups': [ 'external', 'builtin', 'internal', 'sibling', 'parent', 'index' ], 
            'newlines-between': 'always',
            alphabetize: { order: 'asc', caseInsensitive: true },
          } 
      ],
    },
  },
);
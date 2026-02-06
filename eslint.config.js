import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Максимум 1 проп в строке, если код многострочный
      'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
      // Первый проп на новой строке если много пропсов
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      // Закрывающая скобка выровнена с открывающим тегом
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      // Индентация для пропсов
      'react/jsx-indent-props': ['error', 2],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
]

import eslint from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ts = tseslint
  .config(
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked
  )
  .map(config => ({
    ...config,
    files: ['**/*.{mts,cts,tsx,ts}'],
  }))

const config = [
  {
    name: 'Ignores',
    ignores: ['public/**', 'node_modules/**', 'dist/**'],
  },
  {
    files: ['**/*.{mts,cts,tsx,ts}'],
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...ts,
  eslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      'no-undef': 'error',
      'react/react-in-jsx-scope': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: [/\.tsx$/, /\.jsx$/],
        },
      ],
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    rules: {
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.{js,mjs,mts,cts,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

export default config

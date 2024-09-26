module.exports = {
  extends: ['plugin:react/recommended', 'airbnb'],
  plugins: [
    'react',
    'react-hooks',
    'jsdoc'
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    quotes: ['warn', 'single'],
    semi: 'warn',
    'comma-dangle': ['warn', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    'arrow-body-style': 'warn',
    'arrow-parens': ['warn', 'as-needed'],
    'no-debugger': [0],
    'padded-blocks': [0],
    'no-console': 'off',
    'no-trailing-spaces': 'warn',
    'block-spacing': 'warn',
    'no-unused-vars': 'warn',
    'no-multi-spaces': 'warn',
    'eol-last': 'warn',
    'no-multiple-empty-lines': 'warn',
    'import/prefer-default-export': [0],
    'no-extra-boolean-cast': 0,
    'no-use-before-define': 'warn',
    'no-nested-ternary': [0],
    'prefer-destructuring': ['warn', { object: true, array: true }],
    'array-bracket-spacing': ['warn', 'never'],
    'react/jsx-closing-tag-location': [1],
    'react/jsx-one-expression-per-line': [0, { allow: 'single-child' }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-curly-spacing': [0],
    'react/button-has-type': [1],
    'react/jsx-boolean-value': [1],
    'react/jsx-tag-spacing': [1],
    'react/prop-types': [1],
    'react/self-closing-comp': [1],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-closing-bracket-location': [1],
    'react/jsx-props-no-spreading': [0],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/interactive-supports-focus': [0],
    'jsx-a11y/label-has-associated-control': [0],
    'jsx-a11y/no-noninteractive-element-interactions': [0],
    'jsx-a11y/no-noninteractive-element-to-interactive-role': [0],
    'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
    'jsdoc/require-jsdoc': ['warn', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true
      }
    }],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' }
    ],
    'react/jsx-max-props-per-line': ['warn', { maximum: 3 }],
    'react/jsx-newline': ['warn', { prevent: false }]
  },
  overrides: [
    {
      files: ['*.test.js'],

      rules: {
        'react/prop-types': [0]
      }
    }
  ]
};

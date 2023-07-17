module.exports ={
  tabWidth: 2,
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  printWidth: 80,
  trailingComma: es5,
  tailwindFunctions: [
    'tw',
    'clsx',
    'className'
  ],
  tailwindConfig: './tailwind.config.js',
  plugins: [
    'prettier-plugin-tailwindcss'
  ],
  pluginSearchDirs: false
}



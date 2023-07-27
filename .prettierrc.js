module.exports = {
  tabWidth: 2,
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  tailwindFunctions: ['tw', 'clsx', 'className', 'cn'],
  tailwindAttributes: ['tw', 'cn'],
  tailwindConfig: './tailwind.config.ts',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
};

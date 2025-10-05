import { type Config } from 'prettier';

const config: Config = {
  semi: true,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  trailingComma: 'es5',
  bracketSpacing: true,
  vueIndentScriptAndStyle: true,
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;

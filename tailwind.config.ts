/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default withMT({
  darkMode: ['class'],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.js',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
        sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'paxer-white': '#fff',
        'paxer-silver': '#bdbdbd',
        'paxer-dimgray': '#646464',
        'paxer-gray-100': '#848484',
        'paxer-gray-200': '#787878',
        'paxer-gray-300': '#2b2b2b',
        'paxer-gray-400': '#242424',
        'paxer-gray-500': '#667085',
        'paxer-gray-900': '#101828',
        'paxer-green': '#16b364',
        'paxer-blue': '#1B74E8',
        'paxer-royalblue': '#2970ff',
        'paxer-darkgray': '#adadad',
        'paxer-darkslategray': '#3a3a3a',
        'paxer-papayawhip': '#fff2d3',
        'paxer-dark': '#222222',
        ...colors,
      },
      fontSize: {
        '2xs': '11px',
        smi: '13px',
        sm: '14px',
        xl: '20px',
        base: '16px',
        xs: '12px',
        '3xs': '10px',
        '5xl': '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('flowbite/plugin'),
  ],
} satisfies Config);

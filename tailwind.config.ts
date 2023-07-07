/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
import type { Config } from 'tailwindcss';
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
        'green-light': '#28D099',
        green: '#27A97E',
        'blue-light': '#39ABFE',
        blue: '#2970FF',
        'orange-light': '#FFD358',
        orange: '#FFBC00',
        'red-light': '#FF6C60',
        red: '#EA4335',
        'gray-light': '#ADADAD',
        gray: '#797979',
        'white-smoke': '#F8F8F8',
        black: '#212529',
        white: '#FFFFFF',
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
      borderRadius: {
        '980xl': '999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('flowbite/plugin'),
  ],
} satisfies Config);

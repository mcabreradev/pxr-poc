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
      fontSize: {
        '3xs': '10px',
        '2xs': '11px',
        xs: '12px',
        '2sm': '13px',
        sm: '14px',
        base: '16px',
        xl: '20px',
        '5xl': '24px',
      },
      colors: {
        'brand-300': 'rgb(var(--tw-color-brand-300)/ <alpha-value>)',
        'brand-500': 'rgb(var(--tw-color-brand-500)/ <alpha-value>)',
        'success-300': 'rgb(var(--tw-color-success-300)/ <alpha-value>)',
        'success-500': 'rgb(var(--tw-color-success-500)/ <alpha-value>)',
        'neutral-50': 'rgb(var(--tw-color-neutral-50)/ <alpha-value>)',
        'neutral-100': 'rgb(var(--tw-color-neutral-100)/ <alpha-value>)',
        'neutral-200': 'rgb(var(--tw-color-neutral-200)/ <alpha-value>)',
        'neutral-300': 'rgb(var(--tw-color-neutral-300)/ <alpha-value>)',
        'neutral-400': 'rgb(var(--tw-color-neutral-400)/ <alpha-value>)',
        'neutral-500': 'rgb(var(--tw-color-neutral-500)/ <alpha-value>)',
        'warning-300': 'rgb(var(--tw-color-warning-300)/ <alpha-value>)',
        'warning-500': 'rgb(var(--tw-color-warning-500)/ <alpha-value>)',
        'error-300': 'rgb(var(--tw-color-error-300)/ <alpha-value>)',
        'error-500': 'rgb(var(--tw-color-error-500)/ <alpha-value>)',
        // 'black': 'rgb(var(--tw-color-black)/ <alpha-value>)',
        // 'white': 'rgb(var(--tw-color-white)/ <alpha-value>)',
        green: {
          DEFAULT: '#27A97E',
          50: '#9FE9D0',
          100: '#8EE5C8',
          200: '#6DDDB8',
          300: '#4CD6A8',
          400: '#2FCA97',
          500: '#27A97E',
          600: '#1C7B5C',
          700: '#124E3A',
          800: '#072018',
          900: '#000000',
          950: '#000000',
        },
        blue: {
          DEFAULT: '#2970FF',
          50: '#E1EBFF',
          100: '#CCDDFF',
          200: '#A3C2FF',
          300: '#7BA7FF',
          400: '#528BFF',
          500: '#2970FF',
          600: '#0050F0',
          700: '#003DB8',
          800: '#002A80',
          900: '#001848',
          950: '#000E2C',
        },
        orange: {
          DEFAULT: '#FFBC00',
          50: '#FFECB8',
          100: '#FFE7A3',
          200: '#FFDC7A',
          300: '#FFD152',
          400: '#FFC729',
          500: '#FFBC00',
          600: '#C79300',
          700: '#8F6900',
          800: '#574000',
          900: '#1F1700',
          950: '#030200',
        },
        red: {
          DEFAULT: '#EA4335',
          50: '#FBDEDB',
          100: '#F9CDC9',
          200: '#F6AAA4',
          300: '#F2887F',
          400: '#EE655A',
          500: '#EA4335',
          600: '#D12416',
          700: '#9E1B10',
          800: '#6C130B',
          900: '#390A06',
          950: '#1F0503',
        },
        gray: {
          DEFAULT: '#797979',
          50: '#eaecf0',
          100: '#D5D5D5',
          200: '#CBCBCB',
          300: '#B6B6B6',
          400: '#A2A2A2',
          500: '#8D8D8D',
          600: '#797979',
          700: '#5D5D5D',
          800: '#414141',
          900: '#252525',
        },
        black: {
          DEFAULT: '#212529',
          50: '#73818E',
          100: '#6A7783',
          200: '#58626D',
          300: '#454E56',
          400: '#333940',
          500: '#212529',
          600: '#08090A',
          700: '#000000',
          800: '#000000',
          900: '#000000',
          950: '#000000',
        },
        white: {
          DEFAULT: '#FFFFFF',
          50: '#FFFFFF',
          100: '#F1F1F1',
          200: '#e6e6e6',
          300: '#B9B9B9',
          400: '#9D9D9D',
          500: '#818181',
          600: '#656565',
          700: '#494949',
          800: '#2D2D2D',
          900: '#111111',
          950: '#030303',
        },
      },
      borderRadius: {
        '980xl': '999px',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('flowbite/plugin'),
    require('tailwindcss-animated'),
  ],
} satisfies Config);

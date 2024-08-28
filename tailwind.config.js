/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#191414',
        white: '#FFFFFF',
        gray: '#282828',
        darkgray: '#121212',
        lightgray: '#B3B3B3',
        green: '#1DB954',
      },
      fontFamily: {
        sans: ['"Circular Std"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

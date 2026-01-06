/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          500: '#5B4FF5',
          600: '#4A3FD9',
          700: '#3D32C2',
        },
        surface: '#FFFFFF',
        background: '#F5F5F7',
      },
    },
  },
  plugins: [],
}

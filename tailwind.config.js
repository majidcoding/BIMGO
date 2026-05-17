
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0891B2', // cyan-600 (Teal)
          light: '#06b6d4',
          dark: '#0e7490',
        },
        secondary: {
          DEFAULT: '#F97316', // orange-500
          light: '#fb923c',
          dark: '#ea580c',
        },
        accent: {
          DEFAULT: '#FBBF24', // amber-400 (Yellow)
          light: '#fcd34d',
          dark: '#d97706',
        },
        surface: '#F0FDFA', // teal-50
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'bg-blue-100',
    'bg-orange-100',
    'bg-purple-100',
    'bg-indigo-100',
    'bg-emerald-100',
    'bg-green-900',
    'bg-blue-900',
    'bg-orange-900',
    'bg-purple-900',
    'bg-indigo-900',
    'bg-emerald-900',
    'text-green-600',
    'text-blue-600',
    'text-orange-600',
    'text-purple-600',
    'text-indigo-600',
    'text-emerald-600',
    'text-green-400',
    'text-blue-400',
    'text-orange-400',
    'text-purple-400',
    'text-indigo-400',
    'text-emerald-400',
  ]
}

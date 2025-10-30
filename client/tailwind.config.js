/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // الألوان الرئيسية للتطبيقات الطبية
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        medical: {
          blue: '#1e40af',
          teal: '#0d9488',
          amber: '#d97706',
          red: '#dc2626',
          green: '#16a34a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
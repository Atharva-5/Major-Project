/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add your source paths here
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#F8E0E0',  // Light maroon
          100: '#F2B2B2', // Lighter shade
          200: '#E59494', // Light
          300: '#DE7676', // Soft maroon
          400: '#D65858', // Medium light
          500: '#CE3B3B', // Maroon
          600: '#B62424', // Medium dark
          700: '#A51B1B', // Dark maroon
          800: '#900C0C', // Deeper maroon
          900: '#7F0A0A', // Darkest maroon
        },
        pink: {
          100: '#fef2f2',
          200: '#fee2e2',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
}

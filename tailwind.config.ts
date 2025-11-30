/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Customize your primary color
        secondary: '#9333ea', // Customize your secondary color
        accent: '#f97316', // Customize your accent color
        background: '#111827', // Dark background
        surface: '#1f2937', // Surface color for cards, etc.
        error: '#ef4444', // Error color
        // Add more custom colors as needed
      },
    },
  },
  variants: {},
  plugins: [],
};
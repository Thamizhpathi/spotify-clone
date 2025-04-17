/** @type {import('tailwindcss').Config} */
import scrollbarHide from 'tailwind-scrollbar-hide';
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#2a2a2a', // Custom gray color

      },
      fontFamily: {
        poppins: ["'Poppins'", 'sans-serif'],
      },
    },
  },
  plugins: [ scrollbarHide],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: '#3476AB',
        red: '#AB3434',
        gray: '#A9A9A9',
      },
    },
  },
  plugins: [],
};

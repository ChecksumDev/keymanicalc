/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#d0d0d0",
          200: "#a1a1a1",
          300: "#737373",
          400: "#444444",
          500: "#151515",
          600: "#111111",
          700: "#0d0d0d",
          800: "#080808",
          900: "#040404",
          1000: "#000000",
        },
      },
    },
  },
  plugins: [],
}


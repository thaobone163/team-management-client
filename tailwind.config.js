/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.html",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require('preline/plugin'),
  ],
}

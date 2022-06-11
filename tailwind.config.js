/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // backgroundImage: {
    //   'naval-background': "url('../public/images/naval-bg')",
    // },
    container: {
      padding: '2rem',
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

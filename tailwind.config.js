/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'resume': "url('/images/resume-bg.svg')",
      }
    },
  },
  plugins: [
      require('@tailwindcss/forms')({
        strategy: 'base',
      }),
  ],
}

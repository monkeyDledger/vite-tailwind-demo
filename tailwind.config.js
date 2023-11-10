module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    extend: {
      colors: {
        primary: '#734691',
        'custom-bg': '#cec5d1'
      }
    }
  },
  daisyui: {
    themes: ['light', 'dark', 'dracula']
  }
}

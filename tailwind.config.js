/** @type {import('tailwindcss').Config} */
const spacing = {
  fullScreenHeight: '100vh',
  fullScreenWidth: '100vw',
  container: '1300px',
}

for(let i = 1; i < 101; i++) {
  spacing[i] = `${ i * 10 }px`
}

module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        spacing
      },
      colors: {
        primary: '#032541',
        secondary: '#01B4E4',
        light: '#d0d0d0',
        white: '#FFFFFF',
        black: '#000000'
      }
    },
    plugins: [],
  }
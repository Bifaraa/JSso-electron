/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        Sono: ['sono', 'sans-serif'],
        IBM: ['IBM Plex Mono', 'monospace']
      },
      opacity: {
        5: '.5'
      },
      backgroundImage: {
        'fondo-pantalla': "url('./public/img/lion-2305938_1920.jpg')"
      }
    }
  },
  plugins: [
    // ...
    require('tailwindcss'),
    require('autoprefixer'),
    require('flowbite/plugin')
    // ...
  ]
}

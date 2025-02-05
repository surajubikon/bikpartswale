/** @type {import('tailwindcss').Config} */
export default {

  safelist: [
    'bg-yellow-100', 'text-yellow-700',
    'bg-green-100', 'text-green-700',
    'bg-red-100', 'text-red-700',
    'bg-blue-100', 'text-blue-700',
    'bg-gray-100', 'text-gray-700',
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        "primary-200": "#ffbf00",
        "primary-100": "#ffc929",
        "secondary-200": "#00b050",
        "secondary-100": "#0b1a78",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  
  
  plugins: [],
}


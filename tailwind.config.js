
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'reveal-right': 'revealRight 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealRight: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0', transform: 'translateX(-10px)' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}

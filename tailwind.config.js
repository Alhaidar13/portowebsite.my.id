/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(var(--c-base) / <alpha-value>)',
        fg: 'rgb(var(--c-fg) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        onaccent: 'rgb(var(--c-on-accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Epilogue', 'system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        ping2: { '75%,100%': { transform: 'scale(2.2)', opacity: '0' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        pop: { from: { opacity: '0', transform: 'scale(.97) translateY(10px)' }, to: { opacity: '1', transform: 'none' } },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        ping2: 'ping2 1.8s cubic-bezier(0,0,.2,1) infinite',
        'fade-up': 'fadeUp .7s cubic-bezier(.22,1,.36,1) both',
        pop: 'pop .35s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
}

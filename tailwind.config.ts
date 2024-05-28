import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slide:{
          '0%': { transform: 'translateY(20%)', opacity: "0" },
          '100%': { transform: 'translateY(0)', opacity: "1" },
        }
      },
      animation:{
        slide: 'slide 0.5s ease-in-out'
      }
    },
  },
  plugins: [],
}
export default config

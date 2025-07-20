import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8EFE6',
        darkGray: '#2c2c2c',
        teal: '#2a7a7a',
        lightBlue: '#87ceeb',
        linkBlue: '#0066cc',
        brown: '#d4a574',
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
        serif: ['Times New Roman', 'serif'],
      },
      spacing: {
        '15': '3.75rem',
      },
    },
  },
  plugins: [],
}

export default config 
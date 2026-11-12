import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#1A110B',
        'dark-brown': '#2A1810',
        brown: '#3D2317',
        'warm-brown': '#6B3C24',
        'beige-deep': '#8F8075',
        beige: '#6B5E55',
        'beige-light': '#E7E1D8',
        cream: '#FBF9F5',
        parchment: '#F4EFEA',
        gold: {
          DEFAULT: '#B88E28',
          light: '#D4AF37',
          dark: '#96721A',
          glow: 'rgba(184,142,40,0.25)',
          dim: 'rgba(184,142,40,0.1)',
          border: '#EAD79E',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1EBE5D',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.06)',
        md: '0 4px 16px rgba(42,24,16,0.08)',
        lg: '0 12px 32px rgba(42,24,16,0.12)',
        gold: '0 4px 16px rgba(184,142,40,0.18)',
        'gold-lg': '0 8px 24px rgba(184,142,40,0.25)',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // Custom theme colors
        'theme-bg': {
          light: '#ffffff',
          dark: '#0f0f0f',
        },
        'theme-surface': {
          light: '#f8fafc',
          dark: '#1a1a1a',
        },
        'theme-text': {
          light: '#1e293b',
          dark: '#f1f5f9',
        },
        'theme-text-secondary': {
          light: '#64748b',
          dark: '#94a3b8',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config 
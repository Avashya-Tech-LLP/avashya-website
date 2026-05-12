export const brandConfig = {
  colors: {
    primary: {
      DEFAULT: '#8B5CF6', // Deep purple
      light: '#A78BFA',
      dark: '#6D28D9',
    },
    secondary: {
      DEFAULT: '#06B6D4', // Electric cyan
      light: '#22D3EE',
      dark: '#0891B2',
    },
    accent: {
      DEFAULT: '#10B981', // Emerald green
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      primary: '#0A0A0F',
      secondary: '#111118',
      tertiary: '#1A1A24',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      tertiary: '#71717A',
    },
  },
  typography: {
    fontFamily: {
      sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      display: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
    },
  },
  spacing: {
    section: {
      sm: '4rem',
      md: '6rem',
      lg: '8rem',
    },
  },
} as const;

export const designTokens = {
  colors: {
    brand: {
      50: '#EEF0FD',
      100: '#DDE1FB',
      200: '#BBC3F7',
      300: '#99A5F3',
      400: '#7786EF',
      500: '#4F5EED', // Primary Brand Color
      600: '#3F4BBD',
      700: '#2F388E',
      800: '#20265F',
      900: '#10132F',
    },
    // Standard Slate Scale (Tailwind default approximation for reference)
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      850: '#1e293b', // Custom dark shade from index.html
      900: '#0f172a',
      950: '#020617', // Darker background
    },
    accent: {
      DEFAULT: '#06b6d4', // Cyan-500
      light: '#67e8f9', // Cyan-300
    },
    status: {
      success: '#22c55e', // green-500 (합격/완료)
      warning: '#f97316', // orange-500 (진행중/주의)
      error: '#ef4444', // red-500 (불합격/위험)
      info: '#3b82f6', // blue-500 (제출/정보)
      secondary: '#8b5cf6', // violet-500 (기타)
    },
  },
  typography: {
    fontFamily: {
      sans: ['Pretendard', 'Inter', 'sans-serif'],
    },
  },
  borderRadius: {
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
  },
} as const;

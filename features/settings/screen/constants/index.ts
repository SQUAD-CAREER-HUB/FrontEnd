export const THEME_OPTIONS = [
  {
    id: 'light',
    title: '라이트 모드',
    description: '밝고 깨끗한 기본 테마입니다.',
    activeClass: 'border-brand-500 bg-brand-50/20 dark:bg-brand-900/10',
    iconClass: 'bg-brand-100 text-brand-600',
    textClass: 'text-brand-700 dark:text-brand-400',
  },
  {
    id: 'dark',
    title: '다크 모드',
    description: '눈이 편안한 어두운 테마입니다.',
    activeClass: 'border-brand-500 bg-brand-50/20 dark:bg-brand-900/10',
    iconClass:
      'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
    textClass: 'text-slate-900 dark:text-slate-100',
  },
  {
    id: 'system',
    title: '시스템 설정',
    description: '기기 설정에 맞게 자동 변경됩니다.',
    activeClass: 'border-brand-500 bg-brand-50/20 dark:bg-brand-900/10',
    iconClass:
      'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
    textClass: 'text-indigo-700 dark:text-indigo-400',
  },
] as const;

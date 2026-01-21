import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Career-Hub',
    short_name: 'CareerHub',
    description:
      '구직자의 지원 현황·자소서·면접 일정을 한 곳에서 관리하는 통합 플랫폼',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4f5eed',
    orientation: 'portrait',
    categories: ['productivity', 'business'],
    lang: 'ko',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
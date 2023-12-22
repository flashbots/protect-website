import localFont from 'next/font/local';

export const fontCalibre = localFont({
  src: [
    {
      path: './Calibre-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Calibre-Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './Calibre-Semibold.otf',
      weight: '600',
      style: 'semibold',
    },
  ],
  variable: '--font-calibre',
});

import './globals.css';

import Providers from '@/providers';

import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-sans bg-black text-white'>
        <Providers>{children}</Providers>
        <Analytics mode={'production'} />;
      </body>
    </html>
  );
}

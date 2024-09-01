import './globals.css';

import Providers from '@/providers';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-sans bg-black text-white'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

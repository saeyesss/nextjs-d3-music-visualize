import './globals.css';

export const metadata = {
  title: 'D3 Demo - Shreyas Nidugala',
  description: '',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-sans bg-black text-white'>{children}</body>
    </html>
  );
}

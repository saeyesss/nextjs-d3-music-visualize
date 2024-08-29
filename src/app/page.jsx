import BubbleContainer from '@/components/BubbleContainer';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl mb-8'>Welcome to my Music Viz!</h1>
      <BubbleContainer />
    </main>
  );
}

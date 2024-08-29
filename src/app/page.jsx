'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import BubbleContainer from '@/components/BubbleContainer';
import { useDispatch, useSelector } from 'react-redux';
import Login from '@/components/Login';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.spotify.token);
  const loading = useSelector((state) => state.spotify.loading);
  const error = useSelector((state) => state.spotify.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl mb-8'>Welcome to my Music Viz!</h1>
      {!token ? <Login /> : <BubbleContainer />}
    </main>
  );
}

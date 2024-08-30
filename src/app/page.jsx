'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BubbleContainer from '@/components/BubbleContainer';
import Login from '@/components/Login';
import { fetchLastfmTopAlbums } from '@/redux/slices/lastfmSlice';

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.spotify.token);
  const loading = useSelector((state) => state.spotify.loading);
  const error = useSelector((state) => state.spotify.error);
  const lastfmAlbums = useSelector((state) => state.lastfm.topAlbums);

  useEffect(() => {
    dispatch(fetchLastfmTopAlbums());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-4xl mb-8'>Welcome to my Music Viz!</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {lastfmAlbums &&
          lastfmAlbums.map((album, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={album.image.find((img) => img.size === 'large')?.['#text']}
                alt={album.name}
                style={{ width: '150px', height: '150px' }}
              />
              <p>{album.name}</p>
              <p>{album.artist.name}</p>
            </div>
          ))}
      </div>
      {!token ? <Login /> : <BubbleContainer />}
    </main>
  );
}

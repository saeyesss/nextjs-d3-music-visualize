'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchLastfmTopAlbums,
  fetchLastfmTopArtists,
  fetchLastfmTopTracks,
} from '@/redux/slices/lastfmSlice';
import BubbleChart from '@/components/BubbleChart';

export default function Home() {
  const [username, setUsername] = useState('saeyesss');
  const [activeTab, setActiveTab] = useState('albums');

  const dispatch = useDispatch();
  const lastfmAlbums = useSelector((state) => state.lastfm.topAlbums);
  const lastfmArtists = useSelector((state) => state.lastfm.topArtists);
  const lastfmTracks = useSelector((state) => state.lastfm.topTracks);
  const loading = useSelector((state) => state.lastfm.loading);
  const error = useSelector((state) => state.lastfm.error);

  useEffect(() => {
    if (activeTab === 'albums') {
      dispatch(fetchLastfmTopAlbums(username));
    } else if (activeTab === 'artists') {
      dispatch(fetchLastfmTopArtists(username));
      alert(
        'TODO: Will add this! Latest Last.FM api restricts getting artist images directly. '
      );
    } else if (activeTab === 'tracks') {
      dispatch(fetchLastfmTopTracks(username));
      alert(
        'TODO: Will add this! Latest Last.FM api restricts getting track art directly. '
      );
    }
  }, [activeTab, username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className='relative w-full h-screen bg-gray-900'>
      <h1 className='absolute top-5 left-1/2 transform -translate-x-1/2 text-lg sm:text-xl font-bold text-white bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-lg z-20'>
        your (mine, actually) last.fm top 500!
      </h1>

      <div className='absolute top-20 left-1/2 transform -translate-x-1/2 z-20'>
        <input
          type='text'
          value={'@saeyesss'}
          onClick={(e) => alert('Will get to this soon. PROMISE!')}
          // onChange={(e) => setUsername(e.target.value)}
          placeholder='Last.fm Username'
          className='mt-2 w-64 sm:w-80 px-4 sm:px-6 py-2 text-md sm:text-lg rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg outline-none text-white focus:bg-white/30 focus:border-white focus:shadow-lg transition-all ease-in-out duration-300'
        />
      </div>

      <div className='absolute top-36 sm:top-40 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-20'>
        <button
          className={`px-4 sm:px-6 py-2 text-md sm:text-lg rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg border border-white/30 transition-colors duration-300 ease-in-out ${
            activeTab === 'albums' ? 'bg-white/30 border-white' : ''
          }`}
          onClick={() => setActiveTab('albums')}
        >
          Albums
        </button>
        <button
          className={`px-4 sm:px-6 py-2 text-md sm:text-lg rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg border border-white/30 transition-colors duration-300 ease-in-out ${
            activeTab === 'artists' ? 'bg-white/30 border-white' : ''
          }`}
          onClick={() => setActiveTab('artists')}
        >
          Artists
        </button>
        <button
          className={`px-4 sm:px-6 py-2 text-md sm:text-lg rounded-full bg-white/20 backdrop-blur-md text-white shadow-lg border border-white/30 transition-colors duration-300 ease-in-out ${
            activeTab === 'tracks' ? 'bg-white/30 border-white' : ''
          }`}
          onClick={() => setActiveTab('tracks')}
        >
          Tracks
        </button>
      </div>

      <div className='absolute inset-0 z-10 pointer-events-auto'>
        <BubbleChart
          data={
            activeTab === 'albums'
              ? lastfmAlbums
              : activeTab === 'artists'
              ? lastfmArtists
              : lastfmTracks
          }
        />
      </div>
    </main>
  );
}

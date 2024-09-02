'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BubbleContainer from '@/components/BubbleContainer';
import Login from '@/components/Login';
import {
  fetchLastfmTopAlbums,
  fetchLastfmTopArtists,
  fetchLastfmTopTracks,
} from '@/redux/slices/lastfmSlice';
import BubbleChart from '@/components/BubbleChart';

export default function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.spotify.token);
  const loading = useSelector((state) => state.spotify.loading);
  const error = useSelector((state) => state.spotify.error);
  const lastfmAlbums = useSelector((state) => state.lastfm.topAlbums);
  const lastfmArtists = useSelector((state) => state.lastfm.topArtists);
  const lastfmTracks = useSelector((state) => state.lastfm.topTracks);

  useEffect(() => {
    dispatch(fetchLastfmTopAlbums());
    dispatch(fetchLastfmTopArtists());
    dispatch(fetchLastfmTopTracks());
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <main>
      <h1 className='text-4xl mb-8'>Welcome to my Music Viz!</h1>
      <BubbleChart data={lastfmAlbums} />

      {/* <BubbleContainer /> */}

      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
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

        {lastfmArtists &&
          lastfmArtists.map((artist, index) => (
            <div key={index} style={{ margin: '10px' }}>
              <img
                src={
                  artist.image.find((img) => img.size === 'small')?.['#text']
                }
                alt={artist.name}
                style={{ width: '150px', height: '150px' }}
              />
              <p>{artist.name}</p>
            </div>
          ))}

        {lastfmTracks &&
          lastfmTracks.map((track, index) => (
            <div key={index} style={{ margin: '10px' }}>
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.image.find((img) => img.size === 'small')?.['#text']}
                alt={track.name}
                style={{ width: '150px', height: '150px' }}
              />
              <p>{track.name}</p>
            </div>
          ))}
      </div> */}
      {/* {!token ? <Login /> : <BubbleContainer />} */}
    </main>
  );
}

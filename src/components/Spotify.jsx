'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchSpotifyTokens } from '@/redux/slices/spotifySlice';

const Spotify = () => {
  // const router = useRouter();
  // const dispatch = useDispatch();
  // const searchParams = useSearchParams();
  // useEffect(() => {
  //   const code = searchParams.get('code');
  //   const error = searchParams.get('error');

  //   if (error) {
  //     console.log('Spotify authorization error', error);
  //     router.push('/error');
  //   } else if (code) {
  //     console.log('got code fetching token');
  //     dispatch(fetchSpotifyTokens(code));
  //   }
  // }, [router, dispatch, searchParams]);

  return <div className='text-white h-3'>Still in progress!</div>;
};

export default Spotify;

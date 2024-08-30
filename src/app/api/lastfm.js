import axios from 'axios';

import host from '../../../host';

const LASTFM_API_BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

const lastfmApiClient = axios.create({
  baseURL: LASTFM_API_BASE_URL,
  params: {
    api_key: host.NEXT_PUBLIC_LASTFM_API_KEY,
    format: 'json',
  },
});

export const getUserTopAlbums = async (options = {}) => {
  const response = await lastfmApiClient.get('', {
    params: {
      method: 'user.gettopalbums',
      user: host.NEXT_PUBLIC_LASTFM_USERNAME,
      period: 'overall',
      limit: 20,
      ...options,
    },
  });

  return response.data;
};

export const getUserRecentTracks = async (options = {}) => {
  const response = await lastfmApiClient.get('', {
    params: {
      method: 'user.getrecenttracks',
      user: host.NEXT_PUBLIC_LASTFM_USERNAME,
      limit: 36,
      ...options,
    },
  });

  return response.data;
};

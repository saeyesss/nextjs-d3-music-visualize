import axios from 'axios';

import host from '../../../host';
const ITEM_LIMIT = 500;
const PERIOD = 'overall';
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
      period: PERIOD,
      limit: ITEM_LIMIT,
      ...options,
    },
  });

  return response.data;
};

export const getUserTopArtists = async (options = {}) => {
  const response = await lastfmApiClient.get('', {
    params: {
      method: 'user.gettopartists',
      user: host.NEXT_PUBLIC_LASTFM_USERNAME,
      period: PERIOD,
      limit: ITEM_LIMIT,
      ...options,
    },
  });

  return response.data;
};
export const getUserTopTracks = async (options = {}) => {
  const response = await lastfmApiClient.get('', {
    params: {
      method: 'user.getTopTracks',
      user: host.NEXT_PUBLIC_LASTFM_USERNAME,
      period: PERIOD,
      limit: ITEM_LIMIT,
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
      limit: ITEM_LIMIT,
      ...options,
    },
  });

  return response.data;
};

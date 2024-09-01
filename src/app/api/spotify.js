import axios from 'axios';
import qs from 'qs';
import 'dotenv/config';
import host from '../../../host';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export const createSpotifyApiClient = (token) => {
  return axios.create({
    baseURL: SPOTIFY_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getSpotifyAuthUrl = () => {
  const scope = [
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private',
    'user-library-read',
  ].join(' ');

  const params = new URLSearchParams({
    client_id: host.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: host.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
    scope,
  });

  return `${SPOTIFY_AUTH_ENDPOINT}?${params.toString()}`;
};

export const getSpotifyTokens = async (code) => {
  const auth = Buffer.from(
    `${host.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${host.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');
  const data = qs.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: host.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
  });
  const response = await axios.post(SPOTIFY_TOKEN_ENDPOINT, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${auth}`,
    },
  });
  console.log(response.data, 'dsfsd');
  return response.data;
  // TODO test    see result
};

export const refreshSpotifyToken = async (token) => {
  const auth = Buffer.from(
    `${host.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const data = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: token,
  });

  const response = await axios.post(SPOTIFY_TOKEN_ENDPOINT, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      Authorization: `Basic ${auth}`,
    },
  });

  return response.data;
};

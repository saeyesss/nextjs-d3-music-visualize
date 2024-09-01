import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  createSpotifyApiClient,
  getSpotifyAuthUrl,
  getSpotifyTokens,
  refreshSpotifyToken,
} from '@/app/api/spotify';

const initialState = {
  token: null,
  refreshToken: null,
  expiresIn: null,
  tokenType: null,
  scope: null,
  loading: false,
  error: null,
};

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.tokenType = null;
      state.scope = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpotifyTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSpotifyTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.scope = action.payload.scope;
      })
      .addCase(fetchSpotifyTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(refreshSpotifyAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.scope = action.payload.scope || state.scope;
      })
      .addCase(refreshSpotifyAccessToken.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = spotifySlice.actions;
export default spotifySlice.reducer;

export const fetchSpotifyTokens = createAsyncThunk(
  'spotify/fetchTokens',
  async (code, { rejectWithValue }) => {
    try {
      const data = await getSpotifyTokens(code);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshSpotifyAccessToken = createAsyncThunk(
  'spotify/refreshAccessToken',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const data = await refreshSpotifyToken(refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserTopAlbums,
  getUserTopArtists,
  getUserTopTracks,
} from '@/app/api/lastfm';

const initialState = {
  topAlbums: [],
  topArtists: [],
  topTracks: [],
  loading: false,
  error: null,
};

const lastfmSlice = createSlice({
  name: 'lastfm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastfmTopAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastfmTopAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.topAlbums = action.payload;
      })
      .addCase(fetchLastfmTopAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchLastfmTopArtists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastfmTopArtists.fulfilled, (state, action) => {
        state.loading = false;
        state.topArtists = action.payload;
      })
      .addCase(fetchLastfmTopArtists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchLastfmTopTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastfmTopTracks.fulfilled, (state, action) => {
        state.loading = false;
        state.topTracks = action.payload;
      })
      .addCase(fetchLastfmTopTracks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});
export default lastfmSlice.reducer;

export const fetchLastfmTopAlbums = createAsyncThunk(
  'lastfm/fetchTopAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTopAlbums();
      return data.topalbums.album;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchLastfmTopArtists = createAsyncThunk(
  'lastfm/fetchTopArtists',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTopArtists();
      return data.topartists.artist;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
export const fetchLastfmTopTracks = createAsyncThunk(
  'lastfm/fetchTopTracks',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTopTracks();
      return data.toptracks.track;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

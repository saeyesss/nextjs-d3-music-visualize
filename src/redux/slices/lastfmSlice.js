import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserTopAlbums } from '@/app/api/lastfm';

const initialState = {
  topAlbums: [],
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
      });
  },
});
export default lastfmSlice.reducer;

export const fetchLastfmTopAlbums = createAsyncThunk(
  'lastfm/fetchTopAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUserTopAlbums();
      return data.topalbums.album; // Assuming this is the correct path
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

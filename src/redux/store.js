import { configureStore } from '@reduxjs/toolkit';

import spotifyReducer from './slices/spotifySlice';
import lastfmReducer from './slices/lastfmSlice';

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
    lastfm: lastfmReducer,
  },
});

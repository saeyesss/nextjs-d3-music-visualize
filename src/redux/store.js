import { configureStore } from '@reduxjs/toolkit';

import spotifyReducer from './slices/spotifySlice';

export const store = configureStore({
  reducer: {
    spotify: spotifyReducer,
  },
});

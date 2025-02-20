import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import themeReducer from './slices/themeSlice';
import aiReducer from './slices/aiSlice';
import userPreferencesReducer from './slices/userPreferencesSlice';

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    theme: themeReducer,
    ai: aiReducer,
    userPreferences: userPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
  language: 'en-GB' | 'en-US';
  display: {
    theme: 'light' | 'dark';
    showSidebar: boolean;
    layout: 'compact' | 'comfortable';
  };
  learning: {
    showProgress: boolean;
    enableGamification: boolean;
    showAchievements: boolean;
  };
  isLoading: boolean;
}

const initialState: UserPreferences = {
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium',
  },
  language: 'en-GB',
  display: {
    theme: 'dark',
    showSidebar: true,
    layout: 'comfortable',
  },
  learning: {
    showProgress: true,
    enableGamification: true,
    showAchievements: true,
  },
  isLoading: false,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateAccessibility: (state, action: PayloadAction<Partial<UserPreferences['accessibility']>>) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    setLanguage: (state, action: PayloadAction<UserPreferences['language']>) => {
      state.language = action.payload;
    },
    updateDisplay: (state, action: PayloadAction<Partial<UserPreferences['display']>>) => {
      state.display = { ...state.display, ...action.payload };
      
      // Apply layout changes
      if (action.payload.layout) {
        document.documentElement.classList.toggle('layout-compact', action.payload.layout === 'compact');
      }
      
      // Apply sidebar changes
      if (typeof action.payload.showSidebar === 'boolean') {
        document.documentElement.classList.toggle('sidebar-hidden', !action.payload.showSidebar);
      }
    },
    updateLearning: (state, action: PayloadAction<Partial<UserPreferences['learning']>>) => {
      state.learning = { ...state.learning, ...action.payload };
    },
  },
});

export const {
  setLoading,
  updateAccessibility,
  setLanguage,
  updateDisplay,
  updateLearning,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
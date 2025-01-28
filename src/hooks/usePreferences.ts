import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  setLoading,
  updateAccessibility,
  setLanguage,
  updateDisplay,
  updateLearning,
  type UserPreferences,
} from '../store/slices/userPreferencesSlice';
import type { RootState } from '../store/store';

export function usePreferences() {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.userPreferences);

  const updatePreference = useCallback(async <T>(
    action: (value: T) => { payload: T; type: string },
    value: T
  ) => {
    // Show loading screen
    dispatch(setLoading(true));
    
    // Ensure minimum 4.5 second loading time
    const startTime = Date.now();
    const minLoadTime = 4500; // 4.5 seconds
    
    // Update preference
    dispatch(action(value));
    
    // Calculate remaining time to meet minimum load time
    const elapsed = Date.now() - startTime;
    const remainingTime = Math.max(minLoadTime - elapsed, 0);
    
    // Wait for remaining time
    await new Promise(resolve => setTimeout(resolve, remainingTime));
    
    // Hide loading screen
    dispatch(setLoading(false));
  }, [dispatch]);

  const setAccessibilityPreference = useCallback((
    value: Partial<UserPreferences['accessibility']>
  ) => {
    return updatePreference(updateAccessibility, value);
  }, [updatePreference]);

  const setLanguagePreference = useCallback((
    value: UserPreferences['language']
  ) => {
    return updatePreference(setLanguage, value);
  }, [updatePreference]);

  const setDisplayPreference = useCallback((
    value: Partial<UserPreferences['display']>
  ) => {
    return updatePreference(updateDisplay, value);
  }, [updatePreference]);

  const setLearningPreference = useCallback((
    value: Partial<UserPreferences['learning']>
  ) => {
    return updatePreference(updateLearning, value);
  }, [updatePreference]);

  return {
    preferences,
    setAccessibilityPreference,
    setLanguagePreference,
    setDisplayPreference,
    setLearningPreference,
  };
}
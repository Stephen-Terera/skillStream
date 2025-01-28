import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  category: string;
  skillLevel: string;
}

interface RecommendationsState {
  courses: Course[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetch',
  async (userId: string) => {
    const response = await axios.get(`/api/recommendations/${userId}`);
    return response.data;
  }
);

const initialState: RecommendationsState = {
  courses: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

const courseRecommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    clearRecommendations: (state) => {
      state.courses = [];
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export const { clearRecommendations } = courseRecommendationsSlice.actions;
export default courseRecommendationsSlice.reducer;
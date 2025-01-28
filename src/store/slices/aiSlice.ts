import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}

interface AIState {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export const fetchAIResponse = createAsyncThunk(
  'ai/fetchResponse',
  async (prompt: string) => {
    try {
      const response = await axios.post('/api/ai-prompt', { prompt });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to get AI response');
      }
      throw error;
    }
  }
);

const initialState: AIState = {
  chatHistory: [],
  isLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.chatHistory = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIResponse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAIResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatHistory.push({
          id: Date.now().toString(),
          message: action.payload.response,
          isUser: false,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(fetchAIResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const { clearHistory, clearError } = aiSlice.actions;
export default aiSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: [],
  reducers: {
    addHistory: (state, action) => {
      // state.push(action.payload);
      if (!state.find(item => item.word === action.payload.word)) {
        state.push(action.payload);
      }
    },
    clearHistory: (state, action) => {
      return [];
    },
  },
});

export const {addHistory, clearHistory} = historySlice.actions;
export default historySlice;

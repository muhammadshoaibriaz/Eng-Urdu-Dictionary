import {createSlice} from '@reduxjs/toolkit';
import {ToastAndroid} from 'react-native';
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const word = state.find(item => item.word === action.payload.word);
      if (!word) {
        state.push(action.payload);
        ToastAndroid.show('Added to favorites!', 3000);
      } else {
        ToastAndroid.show('Already added!', 3000);
      }
    },
    removeFavorite: (state, action) => {
      state = state.filter(item => item.word !== action.payload.word);
      ToastAndroid.show('Removed from favorites!', 3000);
      return state;
    },
  },
});

export const {addFavorite, removeFavorite} = favoriteSlice.actions;
export default favoriteSlice;

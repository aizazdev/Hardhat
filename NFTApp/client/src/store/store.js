import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slice/nftSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
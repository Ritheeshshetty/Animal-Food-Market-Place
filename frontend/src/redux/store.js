import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
// import other slices...

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // other reducers
  },
});

export default store;

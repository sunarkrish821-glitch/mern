import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../lib/provider/reducers/cart.reducer';

const store = configureStore({
  reducer: {
    // combine all reducers here
    cart: CartReducer,
  },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
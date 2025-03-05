import { configureStore } from "@reduxjs/toolkit";
import { bestPriceReducer } from "./features/BestPrice/tokenPriceSlice";

export const store = configureStore({
  reducer: {
    tokenPrice: bestPriceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

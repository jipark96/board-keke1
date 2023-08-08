import { configureStore } from "@reduxjs/toolkit";
import join from "./features/join";

const store = configureStore({
  reducer: {
    join,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };

import { configureStore } from "@reduxjs/toolkit";
import join from "./features/join";
import user from "./features/user";

const store = configureStore({
  reducer: {
    join,
    user,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };

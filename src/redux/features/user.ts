import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    resetUser(state) {
      state.username = "";
      state.password = "";
    },
  },
});

export const { setUsername, setPassword, resetUser } = userSlice.actions;

export default userSlice.reducer;

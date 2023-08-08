import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JoinState {
  username: string;
  name: string;
  email: string;
  password: string;
}

const initialState: JoinState = {
  username: "",
  name: "",
  email: "",
  password: "",
};

const JoinSlice = createSlice({
  name: "JoinState",
  initialState,
  reducers: {
    setJoinData: (state, action: PayloadAction<Partial<JoinState>>) => {
      Object.assign(state, action.payload);
    },
    setProfileInputData: (state, action: PayloadAction<Partial<JoinState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { setJoinData, setProfileInputData } = JoinSlice.actions;

export default JoinSlice.reducer;

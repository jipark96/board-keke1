import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JoinState {
  userName: string;
  name: string;
  email: string;
  password: string;
}

const initialState: JoinState = {
  userName: "",
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

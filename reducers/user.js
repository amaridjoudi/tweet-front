import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: null,
  username: null,
  token: null,
  userID: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Info: (state, action) => {
      state.firstname = action.payload.firstname;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.userID = action.payload.userID;
    },
  },
});

export const { Info } = userSlice.actions;
export default userSlice.reducer;

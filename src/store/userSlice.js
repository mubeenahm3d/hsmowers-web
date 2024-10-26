import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    email: "",
    uid: null,
    photoURL: "",
    emailVerified: false,
    subscription: {},
  },
  reducers: {
    setCurrentUser(state, action) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.emailVerified = action.payload.emailVerified;
      state.subscription = action.payload.subscription || {};
    },
    setUserImage(state, action) {
      state.photoURL = action.payload;
    },
  },
});

export const userActions = user.actions;
export const userReducer = user.reducer;

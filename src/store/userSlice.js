import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    displayName: "",
    email: "",
    uid: null,
    photoURL: "",
    theme: "",
    emailVerified: false,
    subscription: {},
    userInfo: {},
  },
  reducers: {
    setCurrentUser(state, action) {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.photoURL = action.payload.photoURL;
      state.emailVerified = action.payload.emailVerified;
      state.subscription = action.payload.subscription || {};
      state.userInfo = action.payload.userInfo || {};
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserImage(state, action) {
      state.photoURL = action.payload;
    },
   
    setTheme(state, action) {
      state.userInfo = {
        ...state.userInfo,
        selectedTheme: action.payload.selectedTheme,
        themeId: action.payload.themeId,
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor,
      };
    },
  },
});

export const userActions = user.actions;
export const userReducer = user.reducer;

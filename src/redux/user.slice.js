import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "../service/api.user";

const initialState = {
  id: null,
  username: null,
  email: null,
  avatar: null,
  isAdmin: null,
  token: null,
  isAuthenticated: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearCredentials: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    updateProfile: (state, { payload }) => {
      state.username = payload.username;
      state.email = payload.email;
      state.avatar = payload.avatar;
      state.isAdmin = payload.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(endpoints.login.matchFulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.isAuthenticated = true;

        state.id = payload._id;
        state.username = payload.username;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.isAdmin = payload.isAdmin;
      })
      .addMatcher(endpoints.verify.matchFulfilled, (state, { payload }) => {
        console.log(payload);
        state.isAuthenticated = true;
        state.token = payload.accessToken;

        state.id = payload._id;
        state.username = payload.username;
        state.email = payload.email;
        state.avatar = payload.avatar;
        state.isAdmin = payload.isAdmin;
      });
  },
});

const userReducer = userSlice.reducer;
export const { setCredentials, clearCredentials, updateProfile } =
  userSlice.actions;
export default userReducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // id: null,
  // username: null,
  // password: null,
  // avatar: null,
  // isAdmin: null,
  // createdAt: null,
  // updatedAt: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      // state.user = null;
      state.token = null;
      // localStorage.clear();
    },
    startEditUser: (state, action) => {
      state.id = action.payload;
    },
    cancelEditUser: (state) => {
      state.id = "";
    },
  },
});

const userReducer = userSlice.reducer;
export const {
  startEditUser,
  cancelEditUser,
  setCredentials,
  clearCredentials,
} = userSlice.actions;
export default userReducer;

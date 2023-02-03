import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  username: "",
  password: "",
  avatar: "",
  isAdmin: "",
  createdAt: "",
  updatedAt: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startEditUser: (state, action) => {
      state.id = action.payload;
    },
    cancelEditUser: (state) => {
      state.id = "";
    },
  },
});

const userReducer = userSlice.reducer;
export const { startEditUser, cancelEditUser } = userSlice.actions;
export default userReducer;

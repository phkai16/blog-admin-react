import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
});

const categoryReducer = categorySlice.reducer;
export const {} = categorySlice.actions;
export default categoryReducer;

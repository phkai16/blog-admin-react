import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
});

const articleReducer = articleSlice.reducer;
export const {} = articleSlice.actions;
export default articleReducer;

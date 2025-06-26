import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  error: null,
  success: null,
};
const fetchStatusSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading: (state, actions) => {
      state.loading = actions?.payload;
    },
    setError: (state, actions) => {
      state.error = actions?.payload;
    },
    setSuccess: (state, actions) => {
      state.success = actions?.payload;
    },
  },
});
export const { toggleLoading, setError, setSuccess } = fetchStatusSlice.actions;
export default fetchStatusSlice.reducer;

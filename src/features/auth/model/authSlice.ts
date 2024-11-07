// import { createSlice } from "@reduxjs/toolkit";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false,
//     isInitialized: false,
//   },

//   reducers: (create) => ({
//     setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
//       state.isLoggedIn = action.payload.isLoggedIn;
//     }),
//     setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
//       state.isInitialized = action.payload.isInitialized;
//     }),
//   }),
//   selectors: {
//     selectIsLoggedIn: (state) => state.isLoggedIn,
//     selectIsInitialized: (state) => state.isInitialized,
//   },
// });

// export const { setIsLoggedIn, setIsInitialized } = authSlice.actions;
// export const authReducer = authSlice.reducer;
// export const { selectIsInitialized, selectIsLoggedIn } = authSlice.selectors;
export {};

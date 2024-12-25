import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        role: string;
      }>
    ) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = true;

      // Persist role in localStorage for role-based navigation
      localStorage.setItem("userRole", action.payload.role);
    },
    clearUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.role = null;
      state.isAuthenticated = false;

      // Clear persisted role
      localStorage.removeItem("userRole");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   userRole: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   userRole: null,
//   isAuthenticated: false,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUserRole: (state, action: PayloadAction<string>) => {
//       state.userRole = action.payload;
//       state.isAuthenticated = true;
//       localStorage.setItem("userRole", action.payload);
//     },
//     clearUserRole: (state) => {
//       state.userRole = null;
//     },
//     logout: (state) => {
//       // Clear all user-related data (extend this if needed)
//       state.userRole = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("userRole");
//     },
//   },
// });

// export const { setUserRole, clearUserRole, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialToken = localStorage.getItem("token");
const initialEmail = localStorage.getItem("email");
// const initialPrime = JSON.parse(localStorage.getItem("isPrime") || "false"); // Ensure parsing

const initialAuthState = {
  idToken: initialToken,
  isLoggedIn: !!initialToken,
  // isPrime: initialPrime, // Add this if needed
  email: initialEmail,
  isDarkMode: false
};

const AuthSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.idToken);
      localStorage.setItem("email", action.payload.email);
      state.idToken = action.payload.idToken;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      // localStorage.removeItem("isPrime");
      state.idToken = null;
      state.email = '';
      state.isLoggedIn = false;
      state.isDarkMode = false;
      // state.isPrime = false; // Reset isPrime on logout
    },
    makeIsPrime(state, action) {
      localStorage.setItem('isPrime', JSON.stringify(action.payload.isPrime));
      // state.isPrime = action.payload.isPrime;
    },
    
    makeItDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});


export const AuthAction = AuthSlice.actions;

export default AuthSlice.reducer;
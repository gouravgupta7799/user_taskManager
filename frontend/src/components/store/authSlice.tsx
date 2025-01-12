import { createSlice } from "@reduxjs/toolkit";

const intitalToken = localStorage.getItem("token")
const intitalEmail = localStorage.getItem("email")
// const intitalprime = JSON.parse(localStorage.getItem("isPrime"))

const initialAuthState = {
  idToken: intitalToken,
  isLoggedIn: !!intitalToken,
//   isPrime: intitalprime,
  email: intitalEmail,
  isDarkMode: false
}

const AuthSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload.idToken)
      localStorage.setItem("email", action.payload.email)
      state.idToken = action.payload.idToken
      state.email = action.payload.email
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      state.idToken = null
      state.email = ''
      state.isLoggedIn = false
      state.isDarkMode = false
    },
    makeIsPrime(state, action) {
      localStorage.setItem('isPrime', action.payload.isPrime)
    //   state.isPrime = true;
    },

    makeItDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    }
  }
})


export const AuthAction = AuthSlice.actions;

export default AuthSlice.reducer;
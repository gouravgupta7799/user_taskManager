import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
import themeReducer from "./themeSlice"; // Added Dark Mode Reducer
// import ExpenseReducer from "./ExpenseSlice"; // Uncomment when needed

const store = configureStore({
    reducer: {
        authRdx: AuthReducer,  // Standardized naming
        theme: themeReducer,   // Added Dark Mode Reducer
        // expenseRdx: ExpenseReducer  // Uncomment when needed
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./authSlice";
// import ExpenseReducer from './ExpenseSlice';

const Store = configureStore({
    reducer: {
        authRdx: AuthReducer,
        // expenseRdx: ExpenseReducer
    }
})

export default Store;
import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
    darkMode: localStorage.getItem("darkMode") === "true", // Load from localStorage
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeState,
    reducers: {
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
            localStorage.setItem("darkMode", state.darkMode.toString()); // Save preference
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;

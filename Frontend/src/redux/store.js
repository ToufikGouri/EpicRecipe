import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        user: userReducer,
    }
})
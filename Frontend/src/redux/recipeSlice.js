import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllRecipes = createAsyncThunk(
    "recipes/getAllRecipes",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/allrecipes?&limit=8`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)
export const getTrendingRecipes = createAsyncThunk(
    "recipes/getTrendingRecipes",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipesby/trendingrecipes?&limit=5`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)

const initialState = {
    allRecipes: null,
    trendingRecipes: null,
    allCategorie: null,
    mainLoading: false
}

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    extraReducers: (builder) => {

        // case for all recipes
        builder
            .addCase(getAllRecipes.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getAllRecipes.fulfilled, (state, action) => {
                state.allRecipes = action.payload
                state.mainLoading = false
            })
            .addCase(getAllRecipes.rejected, (state) => {
                state.mainLoading = false
            })

        // case for trending recipes
        builder
            .addCase(getTrendingRecipes.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getTrendingRecipes.fulfilled, (state, action) => {
                state.trendingRecipes = action.payload
                state.mainLoading = false
            })
            .addCase(getTrendingRecipes.rejected, (state) => {
                state.mainLoading = false
            })

    }
})

export default recipeSlice.reducer
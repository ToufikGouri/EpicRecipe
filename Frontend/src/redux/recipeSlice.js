import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Home page
export const getHomeRecipes = createAsyncThunk(
    "recipes/getHomeRecipes",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/allrecipes?limit=8`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)
export const getTrendingRecipes = createAsyncThunk(
    "recipes/getTrendingRecipes",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipesby/trendingrecipes?limit=5`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)
// Recipe page
export const getTopRecipes = createAsyncThunk(
    "recipes/getTopRecipes",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipesby/toprecipes?limit=6`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)
export const getAllRecipes = createAsyncThunk(
    "recipes/getAllRecipes",
    async ({ page = 1, limit = 8 }) => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/allrecipes?page=${page}&limit=${limit}`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)
// Category page
export const getAllCategories = createAsyncThunk(
    "recipes/getAllCategories",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipesby/categories`, { withCredentials: true })
            .then((val) => val.data.data).catch(err => console.log(err))
    }
)
export const getRecipesByCategory = createAsyncThunk(
    "recipes/getRecipesByCategory",
    async ({ category, page = 1, limit = 8 }) => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipesby/category?category=${category}&page=${page}&limit=${limit}`, { withCredentials: true })
            .then((val) => val.data.data).catch(err => console.log(err))
    }
)

const initialState = {
    homeRecipes: null,
    trendingRecipes: null,

    topRecipes: null,
    allRecipes: null,

    allCategories: null,
    recipesByCategory: null,
    mainLoading: false
}

export const recipeSlice = createSlice({
    name: "recipe",
    initialState,
    extraReducers: (builder) => {

        // HOME PAGE
        // case for home recipes
        builder
            .addCase(getHomeRecipes.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getHomeRecipes.fulfilled, (state, action) => {
                state.homeRecipes = action.payload
                state.mainLoading = false
            })
            .addCase(getHomeRecipes.rejected, (state) => {
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

        // RECIPE PAGE
        // case for top recipes
        builder
            .addCase(getTopRecipes.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getTopRecipes.fulfilled, (state, action) => {
                state.topRecipes = action.payload
                state.mainLoading = false
            })
            .addCase(getTopRecipes.rejected, (state) => {
                state.mainLoading = false
            })
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

        // CATEGORY PAGE
        // case for categories
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.allCategories = action.payload
                state.mainLoading = false
            })
            .addCase(getAllCategories.rejected, (state) => {
                state.mainLoading = false
            })
        // case for recipes by category
        builder
            .addCase(getRecipesByCategory.pending, (state) => {
                state.mainLoading = true
            })
            .addCase(getRecipesByCategory.fulfilled, (state, action) => {
                state.recipesByCategory = action.payload
                state.mainLoading = false
            })
            .addCase(getRecipesByCategory.rejected, (state) => {
                state.mainLoading = false
            })
    }
})

export default recipeSlice.reducer
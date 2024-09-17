import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserData = createAsyncThunk(
    "user/getUserData",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users`, { withCredentials: true })
            .then((res) => res.data.data)
    }
)

export const getDefaultProfiles = createAsyncThunk(
    "user/getDefaultProfiles",
    async () => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/defaultprofiles`, { withCredentials: true })
            .then((val) => val.data.data)
    }
)

export const getUserRecipes = createAsyncThunk(
    "user/getUserRecipes",
    async ({ username, page = 1, limit = 10 }) => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/userrecipe/${username}?page=${page}&limit=${limit}`, { withCredentials: true })
            .then((res) => res.data.data)
    }
)

export const getSavedRecipes = createAsyncThunk(
    "user/getSavedRecipes",
    async ({ page = 1, limit = 10 }) => {
        return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/recipes/savedrecipes?page=${page}&limit=${limit}`, { withCredentials: true })
            .then((res) => res.data.data)
    }
)

const initialState = {
    userData: null,
    defaultProfiles: null,
    userRecipes: null,
    savedRecipes: null,
    recipeToUpdate: null,
    isLoggedIn: false,
    loading: false,
    reloadPage: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLog: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserdata: (state, action) => {
            state.userData = action.payload
        },
        setReloadPage: (state, action) => {
            state.reloadPage = action.payload
        },
        setRecipeToUpdate: (state, action) => {
            state.recipeToUpdate = action.payload
        }
    },
    extraReducers: (builder) => {

        // Case for user data
        builder
            .addCase(getUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userData = action.payload
                state.isLoggedIn = true
                state.loading = false
                localStorage.setItem("isLoggedIn", true)    // for protected route check, bcoz state will empty on reload but this will help
            })
            .addCase(getUserData.rejected, (state) => {
                state.loading = false
            })

        // Case for default profiles (not needed all cases)
        builder
            .addCase(getDefaultProfiles.fulfilled, (state, action) => {
                state.defaultProfiles = action.payload
            })

        // Case for user recipes 
        builder
            .addCase(getUserRecipes.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserRecipes.fulfilled, (state, action) => {
                state.userRecipes = action.payload
                state.loading = false
            })
            .addCase(getUserRecipes.rejected, (state) => {
                state.loading = false
            })

        // Case for saved recipes 
        builder
            .addCase(getSavedRecipes.pending, (state) => {
                state.loading = true
            })
            .addCase(getSavedRecipes.fulfilled, (state, action) => {
                state.savedRecipes = action.payload
                state.loading = false
            })
            .addCase(getSavedRecipes.rejected, (state) => {
                state.loading = false
            })

    }
})

export const { setUserLog, setUserdata, setReloadPage, setRecipeToUpdate } = userSlice.actions

export default userSlice.reducer
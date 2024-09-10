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

const initialState = {
    userData: null,
    defaultProfiles: null,
    isLoggedIn: false,
    loading: false
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
        }
    },
    extraReducers: (builder) => {

        // Case for user
        builder
            .addCase(getUserData.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.userData = action.payload
                state.isLoggedIn = true
                state.loading = false
            })
            .addCase(getUserData.rejected, (state) => {
                state.loading = false
            })

        // Case for default profiles (not needed all cases)
        builder
            .addCase(getDefaultProfiles.fulfilled, (state, action) => {
                state.defaultProfiles = action.payload
            })
    }
})

export const { setUserLog, setUserdata } = userSlice.actions

export default userSlice.reducer
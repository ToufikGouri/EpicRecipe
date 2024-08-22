import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    // checking if the user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        return res.status(401).json(new ApiError(401, "User with username or email already exists"))
    }

    // creating user
    const user = await User.create({
        username, email, password
    })

    // checking if user created successfully and removing some fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        return res.status(500).json(new ApiError(500, "Something went wrong while registering the user"))
    }

    // if reached till here means user created successfully
    return res.status(200)
        .json(new ApiResponse(200,
            { user: createdUser },
            "User created successfully"
        ))
})

const loginUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if (!username && !email) {
        return res.status(400).json(new ApiError(400, "Username or email is required"))
    }

    if (!password) {
        return res.status(400).json(new ApiError(400, "Password is required"))
    }

    // checking if the user exist
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        return res.status(400).json(new ApiError(400, "User does not exist"))
    }
 
    // validating the password
    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        return res.status(400).json(new ApiError(400, "Invalid user credentials"))
    }

    // reached till here means everything is fine
    return res.status(200)
        .json(new ApiResponse(200, user, "User logged in successfully"))

})


export { registerUser, loginUser }


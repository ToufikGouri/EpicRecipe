import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { cookieOptions } from "../utils/myTools.js"
import asyncHandler from "../utils/asyncHandler.js"
import uploadOnCloudinary, { getImageUrlsFromFolder } from "../utils/cloudinary.js"

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // update the refresh token with the generated one
        user.refreshToken = refreshToken

        // now save the user
        await user.save({ validateBeforeSave: false })
        // to avoid for checking password field here unncesserily we use validateBeforeSave option

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error("Something went wrong while generating refresh and access token");
    }

}

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
    // generating tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(createdUser._id)

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200,
            { user: createdUser, accessToken, refreshToken },
            "User registered successfully"
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

    // reached till here means the credentials are right so generate the tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken")

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200,
            { user: loggedInUser, accessToken, refreshToken },
            "User logged in successfully")
        )

})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    req.user = null // Check: Is it neccessary ?

    return res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfylly"))

})

const getUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id)
        .select("-password -refreshToken")

    if (!user) {
        return res.status(404).json(new ApiError(404, "User not found"))
    }

    return res.status(200)
        .json(new ApiResponse(200, user, "User details fetched successfully"))

})

const updateUser = asyncHandler(async (req, res) => {

    const { username, email, oldPass, newPass, defaultImage } = req.body

    const user = await User.findById(req.user._id)

    // for username: check if username already exists
    if (username) {
        const isUserNameExists = await User.findOne({ username })
        if (isUserNameExists) {
            return res.status(400).json(new ApiError(400, "Username already exists"))
        }
        user.username = username
    }

    // for email: check if email already exists
    if (email) {
        const isEmailExists = await User.findOne({ email })
        if (isEmailExists) {
            return res.status(400).json(new ApiError(400, "Email already in use"))
        }
        user.email = email
    }

    // if user wants to change password
    if (oldPass && newPass) {
        const isPasswordValid = await user.isPasswordCorrect(oldPass)

        if (!isPasswordValid) {
            return res.status(401).json(new ApiError(401, "Invalid old password"))
        }
        user.password = newPass
    }

    // if user wants to update profile image 
    // if user choose from default images
    if (defaultImage) user.image = defaultImage
    // if user provided his own image
    const localImagePath = req.file?.path
    if (localImagePath) {
        const imageUrl = await uploadOnCloudinary(localImagePath, "EpicRecipes/UserProfiles")

        if (!imageUrl) {
            return res.status(500).json(new ApiError(500, "Failed to upload image"))
        }
        user.image = imageUrl
    }

    await user.save()

    return res.status(200)
        .json(new ApiResponse(200, {}, "User details updated successfully"))

})

const getDefaultProfiles = asyncHandler(async (req, res) => {

    const folderPath = 'EpicRecipes/UserProfiles/DefaultProfile'; // Correct nested folder path

    let defaultImages = await getImageUrlsFromFolder(folderPath)

    if (!defaultImages) {
        return res.status(501).json(new ApiError(501, "Failed to fetch default profile images"))
    }

    return res.status(200)
        .json(new ApiResponse(200, defaultImages, "Default profile images fetched successfully"))

})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
    getDefaultProfiles
}


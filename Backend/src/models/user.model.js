import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/duj7aqdfc/image/upload/v1724665397/EpicRecipes/UserProfiles/DefaultProfile/DefaultImage.png"
    },
    password: {
        type: String,
        required: true,
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    savedRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }
    ],
    refreshToken: {
        type: String
    }

}, { timestamps: true })


// hashing password before save
userSchema.pre("save", async function (next) {

    // if password isn't modified 
    if (!this.isModified("password")) return next()

    // hashing password if it's modified
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// checking password
userSchema.methods.isPasswordCorrect = async function (newPassword) {
    return await bcrypt.compare(newPassword, this.password)
}

// access and refresh tokens
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


// OTP Schema
const otpSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tempOTP: {
        type: Number,
    },
    expiresAt: {
        type: Date,
        default: () => Date.now() + 5 * 60 * 1000 // 5 minutes from now
    }

}, { timestamps: true })

// Create TTL (Time-To-Live) index on the expiresAt field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OTP = mongoose.model("OTP", otpSchema)
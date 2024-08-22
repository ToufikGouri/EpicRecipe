import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
            ref: "Save"
        }
    ],
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


export const User = mongoose.model("User", userSchema)
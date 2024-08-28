import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "",
    },
    ingredients: {
        type: [String],
        required: true,
    },
    directions: {
        type: [String],
        required: true,
    },
    preparationTime: {
        type: Number,
        default: null,
    },
    servings: {
        type: Number,
        default: null,
    },
    category: {
        type: String,
        default: "",
        lowercase: true,
    },
    isTrending: {
        type: Boolean,
        default: false
    },
    isTopRecipe: {
        type: Boolean,
        default: false
    },
    owner: {    // to save the extra DB call we store this basic value directly instead of just _id
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

}, { timestamps: true })

export const Recipe = mongoose.model("Recipe", recipeSchema)
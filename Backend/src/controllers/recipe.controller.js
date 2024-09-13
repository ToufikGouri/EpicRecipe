import { Recipe } from "../models/recipe.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js"
import { recipeWithLikeStatus } from "../utils/myTools.js";

const getSingleRecipe = asyncHandler(async (req, res) => {

    const { id } = req.params

    const recipe = await Recipe.findById(id)

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    const isLiked = recipe.likes.includes(req.user?._id)

    return res.status(200)
        .json(new ApiResponse(200, { ...recipe._doc, isLiked }, "Recipe fetched successfully"))

})

const getAllRecipes = asyncHandler(async (req, res) => {

    // we'll take userId from body instead of req.user because we won't use JWT middleware there since guest user can also get recipes
    const { userId } = req.body
    const { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit

    const recipes = await Recipe.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))

    if (!recipes) {
        return res.status(500).json(new ApiError(500, "Failed to get all recipes"))
    }

    const updatedRecipes = recipeWithLikeStatus(recipes, userId)

    return res.status(200)
        .json(new ApiResponse(200, updatedRecipes, "All recipes fetched successfully"))

})

const getRandomRecipes = asyncHandler(async (req, res) => {

    const { num = 8 } = req.params

    const recipes = await Recipe.aggregate([
        {
            $sample: { size: parseInt(num) }
        }
    ])

    if (!recipes) {
        return res.status(500).json(new ApiError(500, "Failed to get random recipes"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipes, "Random recipes fetched successfully"))

})

const getUserRecipes = asyncHandler(async (req, res) => {

    // we'll take userId from body instead of req.user because we won't use JWT middleware there since guest user can also get recipes
    let { username } = req.params
    let { page = 1, limit = 10 } = req.query
    const skip = (page - 1) * limit 


    const recipes = await Recipe.find({ "owner.username": username })
        .skip(parseInt(skip))
        .limit(parseInt(limit))

    if (!recipes) {
        return res.status(500).json(new ApiError(500, "Failed to get user recipes"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipes, "User recipes fetched successfully"))

})

const addRecipe = asyncHandler(async (req, res) => {

    let { title, description, ingredients, directions, preparationTime, servings, category } = req.body
    const owner = req.user


    // title, ingredients & directions are required fields & rest are optional
    if (!title || !ingredients || !directions) {
        return res.status(400).json(new ApiError(400, "Title, ingredients and directions are required fields"))
    }

    // as the ingredients & directions are Array of Strings, we'll recieve them as Strings 
    // so need to parse them into Array again
    ingredients = JSON.parse(ingredients)
    directions = JSON.parse(directions)


    // if image is provided
    const localImagePath = req.file?.path
    let image;
    if (localImagePath) {
        const imageUrl = await uploadOnCloudinary(localImagePath, "EpicRecipes/Recipes")

        if (!imageUrl) {
            return res.status(500).json(new ApiError(500, "Failed to upload image"))
        }
        image = imageUrl
    }

    // creating recipe
    const recipe = await Recipe.create({
        title, description, image, ingredients, directions, preparationTime, servings, image, category,
        owner: { _id: owner?._id, username: owner?.username, image: owner?.image }
    })

    // updating the user's recipe data
    await User.findByIdAndUpdate(req.user?._id, {
        $push: {
            recipes: recipe._id
        }
    })

    return res.status(200)
        .json(new ApiResponse(200, recipe, "Recipe created successfully"))

})

const updateRecipe = asyncHandler(async (req, res) => {

    let { recipeId, title, description, ingredients, directions, preparationTime, servings, category } = req.body

    // title, ingredients & directions are required fields & rest are optional
    if (!title || !ingredients || !directions) {
        return res.status(400).json(new ApiError(400, "Title, ingredients and directions are required fields"))
    }

    // as the ingredients & directions are Array of Strings, we'll recieve them as Strings 
    // so need to parse them into Array again
    ingredients = JSON.parse(ingredients)
    directions = JSON.parse(directions)

    // if image is provided
    const localImagePath = req.file?.path
    let image;
    if (localImagePath) {
        const imageUrl = await uploadOnCloudinary(localImagePath, "EpicRecipes/Recipes")

        if (!imageUrl) {
            return res.status(500).json(new ApiError(500, "Failed to upload image"))
        }
        image = imageUrl
    }

    // updaing the recipe: if any field is not provided i.e. null they will be ignored in query
    const recipe = await Recipe.findByIdAndUpdate(
        recipeId,
        {
            $set: {
                title, description, ingredients, directions, preparationTime, servings, image, category
            }
        },
        { new: true }
    )

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    return res.status(200)
        .json(new ApiResponse(200, recipe, "Recipe updated successfully"))

})

const deleteRecipe = asyncHandler(async (req, res) => {

    const { id } = req.params

    const isRecipeExist = await Recipe.findById(id)
    if (!isRecipeExist) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    // remove recipe from User schema
    await User.updateMany(
        { $or: [{ recipes: id }, { savedRecipes: id }] },
        {
            $pull: {
                recipes: id,
                savedRecipes: id,
            }
        }
    )

    // deleting the recipe: this method will return the recipe after deleting 
    // so if it doesn't return any recipe means there is any error 
    const deletedRecipe = await Recipe.findByIdAndDelete(id)
    if (!deletedRecipe) {
        return res.status(500).json(new ApiError(500, "Failed to delete recipe"))
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Recipe deleted successfully"))

})

const likeRecipe = asyncHandler(async (req, res) => {

    const { recipeId, likeVal } = req.body
    const userId = req.user?._id

    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    const isRecipeLiked = await Recipe.findOne({ _id: recipeId, likes: userId })

    // if user wants to like recipe
    if (likeVal) {
        // checking if the recipe is already liked
        if (isRecipeLiked) {
            return res.status(400).json(new ApiError(400, "Recipe is already liked"))
        }
        // updating the recipe's like
        await Recipe.findByIdAndUpdate(
            recipeId,
            {
                $push: { likes: userId }
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, {}, "Recipe liked successfully"))
    } else {
        // if user wants to unlike recipe
        if (!isRecipeLiked) {
            return res.status(400).json(new ApiError(400, "Recipe is already unliked"))
        }
        // updating the recipe's like
        await Recipe.findByIdAndUpdate(
            recipeId,
            {
                $pull: { likes: userId }
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, {}, "Recipe unliked successfully"))
    }

})

const saveRecipe = asyncHandler(async (req, res) => {

    const { recipeId, saveVal } = req.body
    const userId = req.user?._id

    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
        return res.status(404).json(new ApiError(404, "Recipe not found"))
    }

    const isRecipeSaved = await User.findOne({ _id: userId, savedRecipes: recipeId })

    // if user wants to save recipe
    if (saveVal) {
        // checking if the recipe is already saved
        if (isRecipeSaved) {
            return res.status(400).json(new ApiError(400, "Recipe is already saved"))
        }
        // updating the user's save
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { savedRecipes: recipeId }
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, {}, "Recipe saved successfully"))
    } else {
        // if user wants to unsave recipe
        if (!isRecipeSaved) {
            return res.status(400).json(new ApiError(400, "Recipe is already unsaved"))
        }
        // updating the user's save
        await User.findByIdAndUpdate(
            userId,
            {
                $pull: { savedRecipes: recipeId }
            }
        )

        return res.status(200)
            .json(new ApiResponse(200, {}, "Recipe unsaved successfully"))
    }

})

export {
    getSingleRecipe,
    getAllRecipes,
    getRandomRecipes,
    getUserRecipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    likeRecipe,
    saveRecipe
}
import { Router } from "express";
import { addRecipe, deleteRecipe, getAllRecipes, getRandomRecipes, getSavedRecipes, getSearchRecipes, getSingleRecipe, getUserRecipes, likeRecipe, saveRecipe, updateRecipe } from "../controllers/recipe.controller.js";
import { uploadUsingMulter } from "../middlewares/multer.middleware.js";
import { optionalJWT, verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/recipe/:id").get(optionalJWT, getSingleRecipe)

router.route("/allrecipes").get(getAllRecipes)

router.route("/randomrecipes/:num").get(getRandomRecipes)

router.route("/search").get(getSearchRecipes)

router.route("/userrecipe/:username").get(getUserRecipes)

// protected routes

router.route("/savedrecipes").get(verifyJWT, getSavedRecipes)

router.route("/addrecipe").post(verifyJWT, uploadUsingMulter.single("image"), addRecipe)

router.route("/updaterecipe").patch(verifyJWT, uploadUsingMulter.single("image"), updateRecipe)

router.route("/deleterecipe/:id").delete(verifyJWT, deleteRecipe)

router.route("/likerecipe").post(verifyJWT, likeRecipe)

router.route("/saverecipe").post(verifyJWT, saveRecipe)

export default router
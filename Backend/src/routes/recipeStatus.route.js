import { Router } from "express";
import { getAllCategories, getRecipeByCategory, getTopRecipes, getTrendingRecipes, updateTopRecipes, updateTrendingRecipes } from "../controllers/recipeStatus.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/trendingrecipes").get(getTrendingRecipes)

router.route("/toprecipes").get(getTopRecipes)

router.route("/categories").get(getAllCategories)

router.route("/category").get(getRecipeByCategory)

// should be only accessible by ADMIN, so hard name & hide from client side
router.route("/updatetrendingrecipes").patch(verifyJWT, updateTrendingRecipes)
router.route("/updatetoprecipes").patch(verifyJWT, updateTopRecipes)

export default router
import { Router } from "express";
import { getDefaultProfiles, getUser, loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.controller.js";
import { uploadUsingMulter } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/defaultprofiles").get(getDefaultProfiles)

// secured routes
router.route("/").get(verifyJWT, getUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/updateprofile").patch(verifyJWT, uploadUsingMulter.single("image"), updateUser)

export default router
import express from "express"
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// configs
app.use(express.json({ limit: "16kb" }))                            // configure data in json 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))      // configure data in url form 
app.use(express.static("public"))                                   // configure to use static data like pdf,images etc.

app.use(cookieparser())     // cookieparser config to manage the cookies

// route for health check
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Everything is fine",
    })
})


// routes import
import userRouter from "./routes/user.route.js"
import recipeRouter from "./routes/recipe.route.js"
import recipeStatusRouter from "./routes/recipeStatus.route.js"

// routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/recipes", recipeRouter)
app.use("/api/v1/recipesby", recipeStatusRouter)

export default app
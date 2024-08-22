import express from "express"

const app = express()

// configs
app.use(express.json({ limit: "16kb" }))                            // configure data in json 
app.use(express.urlencoded({ extended: true, limit: "16kb" }))      // configure data in url form 
  


// route for health check
app.get("/api/v1", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Everything is fine",
    })
}) 


// routes import
import userRouter from "./routes/user.route.js"

// routes declaration
app.use("/api/v1/users", userRouter)


export default app
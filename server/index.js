import express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import connectDB from "./mongoDB/connect.js";

import dalleRoutes from "./Routes/dalleRoutes.js"
import postRoutes from "./Routes/postRoutes.js"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json({ limit: "50mb" }))
// these are basically the end points which we can 
// hook-on-to and use from from frontend part
app.use("/api/v1/post", postRoutes)
 
app.use("/api/v1/dalle", dalleRoutes)


app.get("/", async (req, res) => {

    res.send("Hello KnOCK KnocK it's Open Ai's DALE 2 ")
})
const startServer = async () => {

    try {
        // mongoDB atlas URL
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log("Server has started on port https://imaigem.onrender.com")
        )
    }
    catch (error) {
        console.log(error)
    }


}
startServer()
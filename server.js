import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import expressEjsLayouts from "express-ejs-layouts"
import studentsRouter from "./routes/studentsRouter.js"

// config express
const app = express()
// Serve static files (optional)
app.use(express.static("public"));


// json data and url config
app.use(express.json())
app.use(express.urlencoded({extended : true}))
// env config
dotenv.config()
const PORT = process.env.SERVER_PORT || 5050


// ejs setup
app.set("view engine", "ejs")

// express ejs layouit
app.use(expressEjsLayouts)
app.set("layout", "main/layout")


// router setup
app.use("/", studentsRouter)




app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`.bgBlue);
    
})
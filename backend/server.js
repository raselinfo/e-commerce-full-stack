require("dotenv").config()
const express = require("express")
const data = require("./data")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./router/seedProduct")
const productRoutes = require("./router/productRoutes")
const userRouters = require("./router/userRoutes")
const app = express()
const URI = process.env.MONGODB_URI
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/seed", router)
app.use("/api/product", productRoutes)
app.use("/api/user", userRouters)
app.use((err, req, res, next) => {
    res.status(500).send({ status: err, message: err.message })
})

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected : ${conn.connection.host}`);
        app.listen(4000, () => {
            console.log(`http://localhost:4000`)
        })
    } catch (error) {
        console.error(`Error:${error.message}`);
        connectDB()
        process.exit();
    }
};
connectDB()


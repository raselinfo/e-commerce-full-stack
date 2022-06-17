require("dotenv").config()
const path = require("path")
const express = require("express")
const morgan = require("morgan")
const data = require("./data")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./router/seedProduct")
const productRoutes = require("./router/productRoutes")
const userRouters = require("./router/userRoutes")
const orderRoutes = require("./router/orderRoutes")
const { isAuth } = require("./utils")
const app = express()
const URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 4000
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
__dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/build")))
app.use("/api/seed", router)
app.use("/api/product", productRoutes)
app.use("/api/user", userRouters)
app.use("/api/orders", orderRoutes)




app.use((err, req, res, next) => {
    res.status(500).send({ status: err, message: err.message })
})
app.get("/api/key/paypal", isAuth, (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})
// Sever the html file from the build folder
app.use("*", (req, res) => {
    res.send(path.join(__dirname, "/frontend/build/index.html"))
})
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`mongodb connected : ${conn.connection.host}`);
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error(`Error`);
        connectDB()
        process.exit();

    }
};
connectDB()


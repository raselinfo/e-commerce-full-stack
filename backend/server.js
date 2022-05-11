const express = require("express")
const data = require("./data")
const cors = require("cors")
const app = express()

app.use(cors())
app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/product/slug/:slug", (req, res) => {
    const product = data.products.find(pd => pd.slug === req.params.slug)

    if (product) {
        res.send(product)
    } else {
        res.status(404).json({ message: "Not Found!", status: 404 })
    }

})

app.get("/api/product/:id", (req, res) => {
    const { id } = req.params
    const product = data.products.find(item => item._id === Number(id))
    if (product) {
        res.send(product)
    } else {
        res.status(404).json({ message: "Data Not found!" })
    }
})




app.listen(4000, () => {
    console.log(`http://localhost:4000`)
})
const router = require("express").Router()
const Product = require("../model/Product")

router.get("/", async (req, res) => {
    const products = await Product.find()
    res.send(products)
})
router.get("/slug/:slug", async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })

    if (product) {
        res.send(product)
    } else {
        res.status(404).json({ message: "Not Found!", status: 404 })
    }

})

router.get("/categories", async (req, res) => {
    const categories = await Product.find().distinct('category')
    res.send(categories)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).json({ message: "Data Not found!" })
    }
})



module.exports = router
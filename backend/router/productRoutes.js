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

router.get("/:id", async (req, res) => {
    const { id } = req.params  
    console.log(id)  
    const product =await Product.findById(id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).json({ message: "Data Not found!" })
    }
})

module.exports = router
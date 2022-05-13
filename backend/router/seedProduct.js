const router = require("express").Router()
const Product = require("../model/Product")
const User = require("../model/User")
const Products = require("../data")
router.route('/').get(async (req, res) => {
    await Product.deleteMany({})
    const createdProducts = await Product.insertMany(Products.products)

    await User.deleteMany({})
    const createdUsers = await User.insertMany(Products.users)

    res.send({
        createdProducts, createdUsers
    })
})

module.exports = router
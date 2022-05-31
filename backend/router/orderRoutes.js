const router = require("express").Router()
const Order = require("../model/Order")
const expressAsyncHandler = require("express-async-handler")
const generateToken = require("../utils")


router.post("/", expressAsyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body
    const order = new Order({
        orderItems: orderItems.map(item => ({ ...item, product: item._id }))
    })

}))

module.exports = router
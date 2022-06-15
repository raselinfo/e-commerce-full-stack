const router = require("express").Router()
const Order = require("../model/Order")
const expressAsyncHandler = require("express-async-handler")
const { generateToken, isAuth } = require("../utils")


router.post("/", isAuth, expressAsyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body
    const newOrder = new Order({
        orderItems: orderItems.map(item => ({ ...item, product: item._id })),
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: req.user._id
    })
    try {
        const order = await newOrder.save()
        return res.status(201).send({ message: "New Order Created", order })
    } catch (err) {
        console.log(err)
    }

}))
router.get("/mine", isAuth, expressAsyncHandler(async (req, res) => {
    const { _id } = req.user
    const orders = await Order.find({ user: _id })
    res.send(orders)

}))

router.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if (order) {
        return res.send(order)
    }
    return res.status(404).send({ message: "Order Not found" })
}))

router.put("/:id/pay", isAuth, expressAsyncHandler(async (req, res) => {
    console.log("Hello")
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save()
        res.send({ message: "Order Paid", order: updatedOrder })
    } else {
        res.status(404).send({ message: "Order Not found" })
    }
}))

module.exports = router
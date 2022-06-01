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

router.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const order = await Order.findById(id)
    if(order){
       return res.send(order)
    }
    return res.status(404).send({message:"Order Not found"})
}))

module.exports = router
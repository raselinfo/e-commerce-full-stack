const router = require("express").Router()
const Order = require("../model/Order")
const expressAsyncHandler = require("express-async-handler")
const generateToken = require("../utils")


router.post("/", expressAsyncHandler(async (req, res) => {
    const order=new Order({
        
    })
}))

module.exports = router
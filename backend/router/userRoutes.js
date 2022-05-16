const router = require("express").Router()
const asyncHandler = require("express-async-handler")
const User = require("../model/User")
var bcrypt = require('bcryptjs');
const generateToken = require("../utils");

router.post("/signin", asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select("-__v -createdAt -updatedAt")
    if (user) {
        const match = bcrypt.compareSync(password, user.password)
        if (match) {
            return res.send({ ...user._doc, token: generateToken(user._doc) })
        }
    }
    return res.status(401).send({ message: 'Invalid email or password' });
}))
module.exports = router
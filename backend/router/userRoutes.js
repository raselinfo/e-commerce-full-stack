const router = require("express").Router()
const asyncHandler = require("express-async-handler")
const User = require("../model/User")
var bcrypt = require('bcryptjs');
const { generateToken, isAuth } = require("../utils");

router.post("/signin", asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select("-__v -createdAt -updatedAt")
    if (user) {
        const match = bcrypt.compareSync(password, user.password)
        if (match) {
            delete user._doc.password
            return res.send({ ...user._doc, token: generateToken(user._doc) })
        }
    }
    return res.status(401).send({ message: 'Invalid email or password' });
}))


router.post("/signup", asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const hashPass = bcrypt.hashSync(password)
    const newUser = new User({
        name, email, password: hashPass, isAdmin: "false"
    })
    try {
        const user = await newUser.save()
        return res.send({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._doc)
        })
    } catch (err) {
        throw new Error(err.message)
        return
    }

}))

router.put('/profile', isAuth, asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        if (password) {
            const hasPass = bcrypt.hashSync(password)
            user.password = hasPass
        }


        const updatedUser = await user.save()
        console.log(updatedUser._doc)
        res.send({ ...updatedUser._doc, token: generateToken(updatedUser._doc) })
    }else{
        res.status(404).send({message:"User Not found"})
    }
}))


module.exports = router
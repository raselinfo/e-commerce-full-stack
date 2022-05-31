const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' })
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
}

module.exports = { generateToken }
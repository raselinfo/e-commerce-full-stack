const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const generateToken = (user) => {
    console.log(user)
    return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' })
}

module.exports = generateToken
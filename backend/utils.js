const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET, { expiresIn: '30d' })
}
const verifyJWt = (payload, cb) => {
    return jwt.verify(payload, JWT_SECRET, cb)
}
const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    if (authorization) {
        const token = authorization.slice(7, authorization.length)
        verifyJWt(token, (err, decode) => {
            if (err) {
                return res.status(401).send({ message: "Invalid Token" })
            }
            console.log(decode)
            req.user = decode
            next()
        })
    }else{
        return res.status(404).send({ message: "Token Not found" })
    }
}

module.exports = { generateToken, isAuth, verifyJWt }
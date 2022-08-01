const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
class JwtService {
  static sign(payload, secret = JWT_SECRET, expiry = "15m") {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(payload, secret = JWT_SECRET) {
    return jwt.verify(payload, secret);
  }
}

module.exports = JwtService;

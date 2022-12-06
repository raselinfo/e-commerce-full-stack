const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config");
class JwtService {
  static sign(payload, expiry = "15m", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(payload, secret = JWT_SECRET) {
    return jwt.verify(payload, secret);
  }
}

module.exports = JwtService;

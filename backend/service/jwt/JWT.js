const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, MODE } = require('../../config');

class JwtService {
  /**
   *
   * @param {user} payload
   * @param {"time"} expiry
   * @param {*} secret
   * @returns token
   */
  static signAccessToken(
    payload,
    expiry = MODE.trim() === 'development' ? '360d' : '1m',
    secret = JWT_ACCESS_SECRET
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static signRefreshToken(
    payload,
    expiry = '365d',
    secret = JWT_REFRESH_SECRET
  ) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  /**
   *
   * @param {token} payload
   * @param {*} secret
   * @returns
   */
  static verifyAccessToken(payload, secret = JWT_ACCESS_SECRET) {
    return jwt.verify(payload, secret);
  }
  static verifyRefreshToken(payload, secret = JWT_REFRESH_SECRET) {
    return jwt.verify(payload, secret);
  }
}

module.exports = JwtService;

const bcrypt = require("bcrypt");
class Password {
  /**
   *
   * @param {String} User Password
   * @returns Hash Password
   */
  static hash(payload) {
    return bcrypt.has(payload, 10);
  }

  /**
   *
   * @param {String} plainPassword
   * @param {String} hashPassword
   * @returns Boolean True/False
   */
  static verify(plainPassword, hashPassword) {
    return bcrypt.compare(plainPassword, hashPassword);
  }
}

module.exports = Password;

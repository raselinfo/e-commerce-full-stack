const User = require("../../model/User");
class UserService {
  /**
   * 
   * @param {id/email} key 
   * @param {id/email} value 
   * @returns 
   */
  static findByProperty({key, value}) {
    if (key === "_id") {
      return User.findById(value);
    }
    return User.findOne({ [key]: value });
  }
}

module.exports = UserService;

const User = require("../../model/User");
class UserService {
  static findByProperty(key, value) {
    if (key === "_id") {
      return User.findById(value);
    }
    return User.findOne({ [key]: value });
  }
}

module.exports = UserService;

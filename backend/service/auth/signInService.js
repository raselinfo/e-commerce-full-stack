const UserService = require("../User/UserService");
const signInService = async ({ email, password }) => {
  // Todo: Check if user exist or not
  const user = await UserService.findByProperty("email", email);
};

module.exports = signInService;

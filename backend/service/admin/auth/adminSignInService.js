const User = require('../../../model/User');
const Joi = require('joi');
const adminSignInService = async ({ credential }) => {
  try {
    const { email, password } = credential;
    const credentialSchema = new Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { value, error } = credentialSchema.validate({ email, password });
    console.log(error);
    if (error) {
      throw new Error(JSON.stringify(error.details));
    }
    // Find User
    const user = await User.findOne({ email: value.email, role: 'ADMIN' });
    console.log(user);
    // verify/compare password
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = adminSignInService;

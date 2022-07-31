const Joi = require("joi");
const singUpController = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().alphanum().max(15).min(3).required(),
    email: Joi.string()
      .pattern(/^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$/)
      .required(),
  });
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/)
    .required();
};

module.exports = singUpController;

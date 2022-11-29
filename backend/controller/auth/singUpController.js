const Joi = require("joi");
const signUp = require("../../service/auth/signUpService");
const singUpController = async (req, res, next) => {
  if (!req.body) res.status(422).json({ message: "Please provide valid data" });
  const userSchema = Joi.object({
    name: Joi.string().max(15).min(3).trim().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }).trim().lowercase().required(),
    image: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    // Todo: Save user to Database
    const { existUser, user, error } = await signUp(value);
    if (existUser) {
      return res
        .status(409)
        .json({ message: "User already exist please verify or login" });
    }
    if (error) {
      res.send(500).json({ message: error });
    }
    return res.status(200).json({ message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = singUpController;

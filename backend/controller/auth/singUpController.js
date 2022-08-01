const Joi = require("joi");
const signUp = require("../../service/auth/signUp");
const singUpController = async (req, res, next) => {
  if (!req.body) res.status(422).json({ message: "Please provide valid data" });
  const userSchema = Joi.object({
    name: Joi.string().max(15).min(3).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com"] },
    }),
    image: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = userSchema.validate(req.body);
  if (error) {
    return next(error);
  }

  try {
    // Todo: Save user to Database
    const user = await signUp(value);
    return res.status(200).json({ message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = singUpController;

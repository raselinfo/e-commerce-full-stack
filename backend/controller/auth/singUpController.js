const Joi = require("joi");
const singUpController = (req, res, next) => {
  if (!req.body) res.status(422).json({ message: "Please provide valid data" });
  const userSchema = Joi.object({
    name: Joi.string().max(15).min(3).required(),
    email: Joi.string().pattern(new RegExp("/^S+@S+.S+$/")).required(),
    image: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });

  const { error, value } = userSchema.validate(req.body);
  if(error){
    return next(error)
  }
  // console.log(error.details);

  // Tod: Save user to Database
};

module.exports = singUpController;

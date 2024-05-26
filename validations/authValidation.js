const Joi = require("joi");

const validateRegistration = (req, res, next) => {

const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required() .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,

  }),
   createdAt: Joi.date().default(() => new Date(), 'current date')
});
const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};


const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
};
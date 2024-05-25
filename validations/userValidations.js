const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required() .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
    "string.empty": `Password cannot be empty`,
    "any.required": `Password is required`,
  }),
  
});

module.exports = userSchema;

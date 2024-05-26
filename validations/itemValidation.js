const Joi = require("joi");

const validateCreateItem = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    startingPrice: Joi.number().positive().required(),
    endTime: Joi.date().greater('now').required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateCreateItem,
};

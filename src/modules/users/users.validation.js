const Joi = require('joi');

const updateProfileSchema = Joi.object({
  fullName: Joi.string().min(3),
});

module.exports = {
  updateProfileSchema,
};

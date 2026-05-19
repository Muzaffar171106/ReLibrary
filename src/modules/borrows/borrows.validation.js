const Joi = require('joi');

const borrowSchema = Joi.object({
  bookId: Joi.number().required(),
});

module.exports = {
  borrowSchema,
};
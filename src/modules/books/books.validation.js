const Joi = require('joi');

const createBookSchema = Joi.object({
  title: Joi.string().required(),

  author: Joi.string().required(),

  description: Joi.string().allow('', null),

  quantity: Joi.number().integer().min(1).required(),

  language: Joi.string().allow('', null),

  publishedYear: Joi.number().integer(),

  isbn: Joi.string().allow('', null),

  pages: Joi.number().integer(),

  categoryId: Joi.number().required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string(),

  author: Joi.string(),

  description: Joi.string().allow('', null),

  quantity: Joi.number().integer().min(1),

  language: Joi.string().allow('', null),

  publishedYear: Joi.number().integer(),

  isbn: Joi.string().allow('', null),

  pages: Joi.number().integer(),

  categoryId: Joi.number(),
});

module.exports = {
  createBookSchema,
  updateBookSchema,
};
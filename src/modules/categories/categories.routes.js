const express = require('express');

const router = express.Router();

const controller = require(
  './categories.controller'
);

const authMiddleware = require(
  '../../middlewares/auth.middleware'
);

const roleMiddleware = require(
  '../../middlewares/role.middleware'
);

const validate = require(
  '../../middlewares/validate.middleware'
);

const {
  createCategorySchema,
  updateCategorySchema,
} = require(
  './categories.validation'
);

router.get(
  '/',
  authMiddleware,
  controller.getCategories
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),

  validate(createCategorySchema),

  controller.createCategory
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),

  validate(updateCategorySchema),

  controller.updateCategory
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),

  controller.deleteCategory
);

module.exports = router;
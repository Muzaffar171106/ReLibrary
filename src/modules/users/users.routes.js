const express = require('express');

const router = express.Router();

const controller = require('./users.controller');

const authMiddleware = require('../../middlewares/auth.middleware');

const validate = require('../../middlewares/validate.middleware');

const { updateProfileSchema } = require('./users.validation');

// Get current user profile
router.get(
  '/profile',
  authMiddleware,
  controller.getProfile
);

// Update user profile
router.put(
  '/profile',
  authMiddleware,
  validate(updateProfileSchema),
  controller.updateProfile
);

// Delete user profile
router.delete(
  '/profile',
  authMiddleware,
  controller.deleteProfile
);

// Admin routes
// Get all users
router.get(
  '/',
  authMiddleware,
  controller.getAllUsers
);

// Get user by ID
router.get(
  '/:id',
  authMiddleware,
  controller.getUserById
);

module.exports = router;
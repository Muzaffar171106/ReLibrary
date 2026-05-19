const express = require('express');

const router = express.Router();

const controller = require('./auth.controller.js');

const validate = require('../../middlewares/validate.middleware.js');

const {
  registerSchema,
  loginSchema,
} = require('./auth.validation');

router.post(
  '/register',
  validate(registerSchema),
  controller.register
);

router.post(
  '/login',
  validate(loginSchema),
  controller.login
);

module.exports = router;
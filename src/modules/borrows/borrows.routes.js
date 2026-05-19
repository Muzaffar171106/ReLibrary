const express = require('express');

const router = express.Router();

const controller = require('./borrows.controller');

const authMiddleware = require('../../middlewares/auth.middleware');

const validate = require('../../middlewares/validate.middleware');

const { borrowSchema } = require('./borrows.validation');

router.post(
  '/',
  authMiddleware,
  validate(borrowSchema),
  controller.borrowBook
);

router.put(
  '/:id/return',
  authMiddleware,
  controller.returnBook
);

router.get(
  '/me',
  authMiddleware,
  controller.getMyBorrows
);

module.exports = router;
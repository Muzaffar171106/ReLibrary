const express = require('express');
const upload = require('../../utils/upload');
const prisma = require('../../config/prisma');
const s3 = require('../../config/s3');

const router = express.Router();

const controller = require(
  './books.controller'
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
  createBookSchema,
  updateBookSchema,
} = require('./books.validation');

router.get(
  '/',
  authMiddleware,
  controller.getBooks
);

router.get(
  '/:id',
  authMiddleware,
  controller.getBookById
);

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  validate(createBookSchema),
  controller.createBook
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validate(updateBookSchema),
  controller.updateBook
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  controller.deleteBook
);

// IMAGE UPLOAD
router.post(
  '/:id/image',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('image'),
  controller.uploadBookImage
);

// PDF UPLOAD
router.post(
  '/:id/pdf',
  authMiddleware,
  roleMiddleware('admin'),
  upload.single('pdf'),
  controller.uploadBookPdf
);

module.exports = router;
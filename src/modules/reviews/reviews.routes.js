const express = require('express');
const router = express.Router();

const controller = require('./reviews.controller');
const auth = require('../../middlewares/auth.middleware');

router.post('/', auth, controller.createReview);

router.put('/:id', auth, controller.updateReview);

router.delete('/:id', auth, controller.deleteReview);

router.get('/book/:bookId', controller.getBookReviews);

module.exports = router;
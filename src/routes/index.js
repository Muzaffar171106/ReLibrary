const express = require('express');

const router = express.Router();

router.use('/auth', require('../modules/auth/auth.routes'));
router.use('/books', require('../modules/books/books.routes'));
router.use('/categories', require('../modules/categories/categories.routes'));
router.use('/borrows', require('../modules/borrows/borrows.routes'));
router.use('/favorites', require('../modules/favorites/favorites.routes'));
router.use('/reviews', require('../modules/reviews/reviews.routes'));
router.use('/users', require('../modules/users/users.routes'));

module.exports = router;
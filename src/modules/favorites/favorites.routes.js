const express = require('express');
const router = express.Router();

const controller = require('./favorites.controller');
const auth = require('../../middlewares/auth.middleware');

router.post('/', auth, controller.addFavorite);

router.delete('/:bookId', auth, controller.removeFavorite);

router.get('/me', auth, controller.getMyFavorites);

module.exports = router;
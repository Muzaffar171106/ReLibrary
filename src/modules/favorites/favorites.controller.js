const service = require('./favorites.service');

const addFavorite = async (req, res, next) => {
  try {
    const result = await service.addFavorite(
      req.user.id,
      Number(req.body.bookId)
    );

    res.status(201).json({
      success: true,
      message: 'Added to favorites',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    await service.removeFavorite(
      req.user.id,
      Number(req.params.bookId)
    );

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getMyFavorites = async (req, res, next) => {
  try {
    const data = await service.getMyFavorites(req.user.id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getMyFavorites,
};
const service = require('./reviews.service');

const createReview = async (req, res, next) => {
  try {
    const review = await service.createReview(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: 'Review created',
      data: review,
    });
  } catch (e) {
    next(e);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await service.updateReview(
      req.user.id,
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Review updated',
      data: review,
    });
  } catch (e) {
    next(e);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await service.deleteReview(
      req.user.id,
      Number(req.params.id)
    );

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

const getBookReviews = async (req, res, next) => {
  try {
    const data = await service.getBookReviews(
      Number(req.params.bookId)
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getBookReviews,
};
const prisma = require('../../config/prisma');

const createReview = async (userId, data) => {
  const exists = await prisma.review.findFirst({
    where: {
      userId,
      bookId: data.bookId,
    },
  });

  if (exists) {
    throw new Error('REVIEW_EXISTS');
  }

  return await prisma.review.create({
    data: {
      userId,
      bookId: data.bookId,
      rating: data.rating,
      comment: data.comment,
    },
  });
};

const updateReview = async (userId, reviewId, data) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) throw new Error('REVIEW_NOT_FOUND');

  if (review.userId !== userId) {
    throw new Error('FORBIDDEN');
  }

  return await prisma.review.update({
    where: { id: reviewId },
    data,
  });
};

const deleteReview = async (userId, reviewId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) throw new Error('REVIEW_NOT_FOUND');

  if (review.userId !== userId) {
    throw new Error('FORBIDDEN');
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  return true;
};

const getBookReviews = async (bookId) => {
  const reviews = await prisma.review.findMany({
    where: { bookId },
    include: {
      user: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const avgRating = await prisma.review.aggregate({
    where: { bookId },
    _avg: {
      rating: true,
    },
  });

  return {
    reviews,
    averageRating: avgRating._avg.rating || 0,
  };
};

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getBookReviews,
};
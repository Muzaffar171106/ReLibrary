const prisma = require('../../config/prisma');

const addFavorite = async (userId, bookId) => {
  const exists = await prisma.favorite.findFirst({
    where: { userId, bookId },
  });

  if (exists) {
    throw new Error('FAVORITE_EXISTS');
  }

  const favorite = await prisma.favorite.create({
    data: { userId, bookId },
    include: { book: true },
  });

  return favorite;
};

const removeFavorite = async (userId, bookId) => {
  const favorite = await prisma.favorite.findFirst({
    where: { userId, bookId },
  });

  if (!favorite) {
    throw new Error('FAVORITE_NOT_FOUND');
  }

  await prisma.favorite.delete({
    where: { id: favorite.id },
  });

  return true;
};

const getMyFavorites = async (userId) => {
  return await prisma.favorite.findMany({
    where: { userId },
    include: { book: true },
  });
};

module.exports = {
  addFavorite,
  removeFavorite,
  getMyFavorites,
};
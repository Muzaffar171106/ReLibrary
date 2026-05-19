const prisma = require('../../config/prisma');

const createCategory = async (data) => {
  const existing =
    await prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

  if (existing) {
    throw new Error(
      'CATEGORY_ALREADY_EXISTS'
    );
  }

  const category =
    await prisma.category.create({
      data,
    });

  return category;
};

const getCategories = async () => {
  const categories =
    await prisma.category.findMany({
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },

      orderBy: {
        name: 'asc',
      },
    });

  return categories;
};

const updateCategory = async (
  id,
  data
) => {
  const existing =
    await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!existing) {
    throw new Error(
      'CATEGORY_NOT_FOUND'
    );
  }

  const duplicate =
    await prisma.category.findFirst({
      where: {
        name: data.name,

        NOT: {
          id: Number(id),
        },
      },
    });

  if (duplicate) {
    throw new Error(
      'CATEGORY_ALREADY_EXISTS'
    );
  }

  const updated =
    await prisma.category.update({
      where: {
        id: Number(id),
      },

      data,
    });

  return updated;
};

const deleteCategory = async (id) => {
  const existing =
    await prisma.category.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
    });

  if (!existing) {
    throw new Error(
      'CATEGORY_NOT_FOUND'
    );
  }

  if (existing._count.books > 0) {
    throw new Error(
      'CATEGORY_HAS_BOOKS'
    );
  }

  await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });

  return true;
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
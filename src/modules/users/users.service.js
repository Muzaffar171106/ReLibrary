const prisma = require('../../config/prisma');

const getAllUsers = async ({ page, limit }) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return user;
};

const updateProfile = async (userId, data) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      fullName: data.fullName,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

const deleteProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  await prisma.user.delete({
    where: { id: Number(userId) },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateProfile,
  deleteProfile,
};

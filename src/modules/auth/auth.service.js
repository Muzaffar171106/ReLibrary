const bcrypt = require('bcrypt');
const prisma = require('../../config/prisma');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('./auth.utils');

const register = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
};

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  register,
  login,
};
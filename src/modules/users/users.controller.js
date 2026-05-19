const service = require('./users.service');

const getProfile = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await service.getAllUsers({
      page: Number(page),
      limit: Number(limit),
    });

    res.status(200).json({
      success: true,
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await service.getUserById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await service.updateProfile(
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await service.deleteProfile(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Profile deleted',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  getAllUsers,
  getUserById,
  updateProfile,
  deleteProfile,
};

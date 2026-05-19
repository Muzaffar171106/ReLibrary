const service = require(
  './categories.service'
);

const createCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await service.createCategory(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        'Category created successfully',

      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (
  req,
  res,
  next
) => {
  try {
    const categories =
      await service.getCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (
  req,
  res,
  next
) => {
  try {
    const category =
      await service.updateCategory(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        'Category updated successfully',

      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (
  req,
  res,
  next
) => {
  try {
    await service.deleteCategory(
      req.params.id
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
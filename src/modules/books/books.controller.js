const service = require('./books.service');

const createBook = async (
  req,
  res,
  next
) => {
  try {
    const book =
      await service.createBook(req.body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const uploadBookImage = async (
  req,
  res,
  next
) => {
  try {
    const book =
      await service.uploadBookImage(
        req.params.id,
        req.file
      );

    res.status(200).json({
      success: true,
      message: 'Image uploaded',
      data: book,
    });
  } catch (e) {
    next(e);
  }
};

const uploadBookPdf = async (
  req,
  res,
  next
) => {
  try {
    const book =
      await service.uploadBookPdf(
        req.params.id,
        req.file
      );

    res.status(200).json({
      success: true,
      message: 'PDF uploaded',
      data: book,
    });
  } catch (e) {
    next(e);
  }
};

const getBooks = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await service.getBooks(req.query);

    res.status(200).json({
      success: true,
      data: result.books,

      pagination:
        result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (
  req,
  res,
  next
) => {
  try {
    const book =
      await service.getBookById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (
  req,
  res,
  next
) => {
  try {
    const book =
      await service.updateBook(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: 'Book updated',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (
  req,
  res,
  next
) => {
  try {
    await service.deleteBook(
      req.params.id
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  uploadBookImage,
  uploadBookPdf,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
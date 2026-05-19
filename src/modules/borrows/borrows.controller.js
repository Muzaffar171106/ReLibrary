const service = require('./borrows.service');

const borrowBook = async (req, res, next) => {
  try {
    const borrow = await service.borrowBook(
      req.user.id,
      Number(req.body.bookId)
    );

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    await service.returnBook(
      req.user.id,
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getMyBorrows = async (req, res, next) => {
  try {
    const borrows = await service.getMyBorrows(
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: borrows,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getMyBorrows,
};
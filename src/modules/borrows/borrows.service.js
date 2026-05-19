const prisma = require('../../config/prisma');
const dayjs = require('dayjs');

const borrowBook = async (userId, bookId) => {
  return await prisma.$transaction(async (tx) => {

    const book = await tx.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new Error('BOOK_NOT_FOUND');
    }

    if (book.availableQuantity <= 0) {
      throw new Error('BOOK_NOT_AVAILABLE');
    }

    const activeBorrows = await tx.borrow.count({
      where: {
        userId,
        status: 'active',
      },
    });

    if (activeBorrows >= 5) {
      throw new Error('BORROW_LIMIT_REACHED');
    }

    const existingBorrow = await tx.borrow.findFirst({
      where: {
        userId,
        bookId,
        status: 'active',
      },
    });

    if (existingBorrow) {
      throw new Error('ALREADY_BORROWED');
    }

    const borrowDate = new Date();

    const returnDate = dayjs(borrowDate)
      .add(14, 'day')
      .toDate();

    const borrow = await tx.borrow.create({
      data: {
        userId,
        bookId,
        borrowDate,
        returnDate,
        status: 'active',
      },
    });

    await tx.book.update({
      where: { id: bookId },
      data: {
        availableQuantity: {
          decrement: 1,
        },
      },
    });

    return borrow;
  });
};

const returnBook = async (userId, borrowId) => {
  return await prisma.$transaction(async (tx) => {

    const borrow = await tx.borrow.findUnique({
      where: { id: borrowId },
    });

    if (!borrow) {
      throw new Error('BORROW_NOT_FOUND');
    }

    if (borrow.userId !== userId) {
      throw new Error('FORBIDDEN');
    }

    if (borrow.status !== 'active') {
      throw new Error('ALREADY_RETURNED');
    }

    await tx.borrow.update({
      where: { id: borrowId },
      data: {
        status: 'returned',
      },
    });

    await tx.book.update({
      where: { id: borrow.bookId },
      data: {
        availableQuantity: {
          increment: 1,
        },
      },
    });

    return true;
  });
};

const getMyBorrows = async (userId) => {
  return await prisma.borrow.findMany({
    where: { userId },
    include: {
      book: true,
    },
    orderBy: {
      borrowDate: 'desc',
    },
  });
};

module.exports = {
  borrowBook,
  returnBook,
  getMyBorrows,
};
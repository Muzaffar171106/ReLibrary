const prisma = require('../../config/prisma');

const {
  buildBookFilters,
} = require('./books.query');

const {
  uploadFile,
} = require('../../services/s3.service');

const createBook = async (data) => {
  const category =
    await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

  if (!category) {
    throw new Error('CATEGORY_NOT_FOUND');
  }

  const book = await prisma.book.create({
    data: {
      ...data,

      availableQuantity: data.quantity,
    },

    include: {
      category: true,
    },
  });

  return book;
};

const getBooks = async (query) => {
  const page = Number(query.page) || 1;

  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filters = buildBookFilters(query);

  const books = await prisma.book.findMany({
    where: filters,

    skip,

    take: limit,

    orderBy: {
      createdAt: 'desc',
    },

    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: filters,
  });

  return {
    books,

    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookById = async (id) => {
  const book = await prisma.book.findUnique({
    where: {
      id: Number(id),
    },

    include: {
      category: true,

      reviews: {
        include: {
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      },
    },
  });

  if (!book) {
    throw new Error('BOOK_NOT_FOUND');
  }

  return book;
};

const updateBook = async (id, data) => {
  const existingBook =
    await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!existingBook) {
    throw new Error('BOOK_NOT_FOUND');
  }

  const updatedBook = await prisma.book.update({
    where: {
      id: Number(id),
    },

    data,

    include: {
      category: true,
    },
  });

  return updatedBook;
};

const uploadBookPdf = async (
  bookId,
  file
) => {
  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
  });

  if (!book) {
    throw new Error('BOOK_NOT_FOUND');
  }

  const pdfKey = await uploadFile(
    file,
    'books/pdfs'
  );

  return await prisma.book.update({
    where: { id: Number(bookId) },

    data: {
      pdfFile: pdfKey,
    },
  });
};

const uploadBookImage = async (
  bookId,
  file
) => {
  const book = await prisma.book.findUnique({
    where: { id: Number(bookId) },
  });

  if (!book) {
    throw new Error('BOOK_NOT_FOUND');
  }

  const imageKey = await uploadFile(
    file,
    'books/images'
  );

  return await prisma.book.update({
    where: { id: Number(bookId) },

    data: {
      image: imageKey,
    },
  });
};

const deleteBook = async (id) => {
  const existingBook =
    await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

  if (!existingBook) {
    throw new Error('BOOK_NOT_FOUND');
  }

  const activeBorrow =
    await prisma.borrow.findFirst({
      where: {
        bookId: Number(id),

        status: 'active',
      },
    });

  if (activeBorrow) {
    throw new Error(
      'BOOK_HAS_ACTIVE_BORROWS'
    );
  }

  await prisma.book.delete({
    where: {
      id: Number(id),
    },
  });

  return true;
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  uploadBookPdf,
  uploadBookImage,
};
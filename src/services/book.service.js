const {
  uploadFile,
} = require('../../services/s3.service');

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
const errorMiddleware = (error, req, res, next) => {
  console.log(error);

  if (error.message === "EMAIL_ALREADY_EXISTS") {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  }

  if (error.message === "INVALID_CREDENTIALS") {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  if (error.message === "BOOK_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  if (error.message === "CATEGORY_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Category not found",
    });
  }

  if (error.message === "BOOK_HAS_ACTIVE_BORROWS") {
    return res.status(409).json({
      success: false,
      message: "Book has active borrows",
    });
  }

  if (error.message === "CATEGORY_ALREADY_EXISTS") {
    return res.status(409).json({
      success: false,
      message: "Category already exists",
    });
  }

  if (error.message === "CATEGORY_HAS_BOOKS") {
    return res.status(409).json({
      success: false,
      message: "Category contains books",
    });
  }

  if (error.message === "BOOK_NOT_AVAILABLE") {
    return res.status(422).json({
      success: false,
      message: "Book is not available",
    });
  }

  if (error.message === "BORROW_LIMIT_REACHED") {
    return res.status(422).json({
      success: false,
      message: "Borrow limit reached (max 5)",
    });
  }

  if (error.message === "ALREADY_BORROWED") {
    return res.status(409).json({
      success: false,
      message: "You already borrowed this book",
    });
  }

  if (error.message === "BORROW_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Borrow record not found",
    });
  }

  if (error.message === "ALREADY_RETURNED") {
    return res.status(409).json({
      success: false,
      message: "Book already returned",
    });
  }

  if (error.message === "FORBIDDEN") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  if (error.message === "FAVORITE_EXISTS") {
    return res.status(409).json({
      success: false,
      message: "Already in favorites",
    });
  }

  if (error.message === "FAVORITE_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Favorite not found",
    });
  }

  if (error.message === "REVIEW_EXISTS") {
    return res.status(409).json({
      success: false,
      message: "You already reviewed this book",
    });
  }

  if (error.message === "REVIEW_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (error.message === "USER_NOT_FOUND") {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorMiddleware;

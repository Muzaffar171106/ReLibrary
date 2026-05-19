const validateImage = (
  req,
  res,
  next
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'File required',
    });
  }

  const allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  if (
    !allowed.includes(req.file.mimetype)
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid image type',
    });
  }

  next();
};

const validatePdf = (
  req,
  res,
  next
) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'PDF required',
    });
  }

  if (
    req.file.mimetype !==
    'application/pdf'
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Only PDF allowed',
    });
  }

  next();
};

module.exports = {
  validateImage,
  validatePdf,
};
const buildBookFilters = (query) => {
  const filters = {};

  if (query.search) {
    filters.OR = [
      {
        title: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      {
        author: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
      {
        isbn: {
          contains: query.search,
          mode: 'insensitive',
        },
      },
    ];
  }

  if (query.categoryId) {
    filters.categoryId = Number(query.categoryId);
  }

  if (query.language) {
    filters.language = query.language;
  }

  return filters;
};

module.exports = {
  buildBookFilters,
};
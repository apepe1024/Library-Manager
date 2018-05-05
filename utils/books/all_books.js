'use strict';

const books = require('../../models').books;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;

  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit })
    .then((allBooks) => {
      res.render('partials/books', { count: allBooks.count, books: allBooks.rows, title: 'Books' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

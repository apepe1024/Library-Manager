
const books = require('../../models').books;

module.exports = (req, res, next) => {
  books.create(req.body)
    .then((book) => {
      res.redirect('/books/page/1');
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        res.render('partials/new_book', {
          book: books.build(req.body), title: 'New Book', errors: err.errors
        });
      } else {
        throw err;
      }
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

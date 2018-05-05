
const books = require('../../models').books;
const loans = require('../../models').loans;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;

  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: loans, where: { returned_on: null } }] })
    .then((checkedOutBooks) => {
      res.render('partials/books', { count: checkedOutBooks.count + 1, books: checkedOutBooks.rows, title: 'Checked Out Books' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

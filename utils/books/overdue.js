
const books = require('../../models').books;
const loans = require('../../models').loans;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;

  books.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: loans, where: { return_by: { $lt: new Date() }, returned_on: null } }] })
    .then((overdueBooks) => {
      res.render('partials/books', { count: overdueBooks.count, books: overdueBooks.rows, title: 'Overdue Books' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

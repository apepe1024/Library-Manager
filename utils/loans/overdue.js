
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;

  loans.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: books }, { model: patrons }], where: { return_by: { $lt: new Date() }, returned_on: null } })
    .then((overdueBooks) => {
      res.render('partials/loans', { count: overdueBooks.count, loans: overdueBooks.rows, title: 'Overdue Books' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};


const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {

  const pagingLimit = 10;
  const page = req.params.page;


  loans.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: books }, { model: patrons }] })
    .then((allLoans) => {
      res.render('partials/loans', { count: allLoans.count, loans: allLoans.rows, title: 'Loans' });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

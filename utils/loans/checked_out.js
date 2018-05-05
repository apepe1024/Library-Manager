
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {

  var pagingLimit = 10;
  var page = req.params.page;

  loans.findAndCountAll({ limit: pagingLimit, offset: (page - 1) * pagingLimit, include: [{ model: books }, { model: patrons }], where: { returned_on: null } })
    .then((checkedOutBooks) => {
      res.render('partials/loans', { count: checkedOutBooks.count, loans: checkedOutBooks.rows, title: 'Checked Out Books' });
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

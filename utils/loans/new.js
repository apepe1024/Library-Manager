
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;
const getDate = require('./get_date.js');

module.exports = (req, res, next) => {

  let loanObject = {};

  loanObject.book_id = req.body.book_id;
  loanObject.patron_id = req.body.patron_id;
  loanObject.loaned_on = req.body.loaned_on;
  loanObject.return_by = req.body.return_by;

  loans.create(loanObject).then(() => {
    res.redirect('/loans/page/1');
  }).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      let today = new Date();
      let addAWeek = new Date();
      addAWeek.setDate(today.getDate() + 7);
      books.findAll({ attributes: ['id', 'title'], order: ['title'] })
        .then((books) => {
          patrons.findAll({ attributes: ['id', 'first_name', 'last_name'], order: ['last_name'] })
            .then((patrons) => {
              res.render('partials/new_loan', {
                books: books,
                patrons: patrons,
                today: getDate(),
                due: getDate(addAWeek),
                errors: err.errors,
                title: 'New Loan'
              });
            });
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

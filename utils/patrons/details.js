
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {
  patrons.findById(req.params.id, {})
    .then(function (patron) {
      loans.findAll({ include: [{ model: books, attributes: ['id', 'title'] }, { model: patrons, where: { id: req.params.id }, attributes: ['first_name', 'last_name'] }] })
        .then((results) => {
          if (results) {
            res.render('partials/patron_details', { patron: patron, results: results, title: patron.first_name + ' ' + patron.last_name });
          }
        }).catch((err) => {
          console.log(err);
          res.sendStatus(500);
          next(err);
        });
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

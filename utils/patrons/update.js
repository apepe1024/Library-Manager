
const books = require('../../models').books;
const loans = require('../../models').loans;
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {
  patrons.findById(req.params.id, {})
    .then((patron) => {
      if (patron) {
        return patron.update(req.body);
      } else {
        res.sendStatus(404);
      }
    }).then((patron) => {
      res.redirect('/patrons/' + patron.id);
    }).catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        patrons.findById(req.params.id, {})
          .then((patron) => {
            if (patron) {
              let patronObject = {};

              patronObject = {
                id: patron.id,
                first_name: patron.first_name,
                last_name: patron.last_name,
                address: patron.address,
                email: patron.email,
                library_id: patron.library_id,
                zip_code: patron.zip_code
              };

              let loanCheck = function (patron) {
                loans.findAll({ include: [{ model: books, attributes: ['id', 'title'] }, { model: patrons, where: { id: req.params.id }, attributes: ['first_name', 'last_name'] }] })
                  .then((results) => {
                    res.render('partials/patron_details', {
                      patron: patronObject,
                      results: results,
                      title: patron.first_name + ' ' + patron.last_name,
                      errors: err.errors
                    });
                  });
              };

              loanCheck(patron);
            };
          }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
            next(err);
          });
      }
    }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
      next(err);
    });
};

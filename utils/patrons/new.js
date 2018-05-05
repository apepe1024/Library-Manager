
const patrons = require('../../models').patrons;

module.exports = (req, res, next) => {
  patrons.create(req.body).then((patron) => {
    res.redirect('/patrons/page/1');
  }).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      res.render('partials/new_patron', {
        patron: patrons.build(req.body),
        title: 'New Patron',
        errors: err.errors
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

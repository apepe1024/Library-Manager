
const router = require('express').Router();

const patronsMain = require('../utils/patrons');

// Handling GET Request to /patrons/page/:page
router.get('/patrons/page/:page', (req, res, next) => {
  patronsMain.main(req, res, next);
});

// Handling GET Request to /patrons/:id
router.get('/patrons/:id', (req, res, next) => {
  patronsMain.details(req, res, next);
});

// Handling PUT Request to /patrons/:id
router.put('/patrons/:id', (req, res, next) => {
  patronsMain.update(req, res, next);
});

// Handling GET Request to /patron/new
router.get('/patron/new', (req, res, next) => {
  res.render('partials/new_patron', { title: 'New Patron' });
});

// Handling POST Request to /patron/new
router.post('/patron/new', (req, res, next) => {
  patronsMain.new(req, res, next);
});

module.exports = router;


const router = require('express').Router();

// Handling GET Request to /
router.get('/', (req, res, next) => {
  res.render('partials/index', { title: 'Library Manager' });
});

module.exports = router;

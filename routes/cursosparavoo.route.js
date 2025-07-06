var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('cursosparavoo'); 
});

router.get('/cursoiniciantes', function(req, res, next) {
  res.render('cursoiniciantes'); 
});

router.get('/cursovootermicas', function(req, res, next) {
  res.render('cursovootermicas'); 
});


module.exports = router;
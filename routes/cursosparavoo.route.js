var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('cursosparavoo'); 
});

router.get('/cursoiniciantes', function(req, res) {
  res.render('cursoiniciantes'); 
});

router.get('/cursovootermicas', function(req, res) {
  res.render('cursovootermicas'); 
});

router.get('/cursolongadistancias', function(req, res) {
  res.render('cursolongadistancias'); 
});

router.get('/cursovoorebocado', function(req, res) {
  res.render('cursovoorebocado'); 
});

router.get('/cursoresgate', function(req, res) {
  res.render('cursoresgate'); 
});

module.exports = router;
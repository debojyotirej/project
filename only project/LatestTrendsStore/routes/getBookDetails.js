var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

   

    next();
  // res.render('index', { title: 'Express' });
  var bookData = {
    bdata : [
    {
        name: 'My Travel  I ',
        price: 2000,
        publisher: 'ABC bookstaller'
    },
    {
        name: 'My Travel history II',
        price: 2000,
        publisher: 'ABC bookstaller'
    },
    {
        name: 'My Travel history III',
        price: 2000,
        publisher: 'ABC bookstaller'
    }]
};


  // res.send(JSON.stringify(bookData));
  res.render('bookpage', bookData);
});

module.exports = router;

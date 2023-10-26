var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
  var empDataList = [
    {
        name: 'Raj',
        empid: 123,
        gender: 'Male'
    },
    {
        name: 'Teena',
        empid: 124,
        gender: 'Male'
    },
    {
        name: 'Krish',
        empid: 125,
        gender: 'Male'
    }
  ]

  res.send(JSON.stringify(empDataList));
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var loginData = {};
    loginData.isUserLoggedin = req.session.isLoggedInUser;
    console.log("responding from processor " + process.pid);
    res.send(JSON.stringify(loginData));
});

module.exports = router;

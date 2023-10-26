var express = require("express");
var bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");


var mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

var router = express.Router();
var userData

router.post('/', (req, res) => {
    
    userData = req.body.params;
    getDbConnection().then((results) => {
        var data = {};
        if (results.length == 0) {
            data.msg = 'Invalid User ID';
        }
        bcrypt.compare(userData.password, results[0].password, function(err, result) {
            if (result) {
                data.msg = 'ValidUser';
                req.session.isLoggedInUser = true;
            } else {
                data.msg = 'Invalid Password'
                req.session.isLoggedInUser = false;
            }
            data = JSON.stringify(data);
            res.send(data);
        });
        
    }).catch((error) => {
        console.log("error");
        console.log(error);
    });
    
});

async function getDbConnection(data) {
    await mongoClient.connect();
    var db = mongoClient.db("latest-trends");
    var collection = db.collection('userAccountDetails');
    var userAccountDetails = collection.find({account_id: userData.userId}).toArray();
    return userAccountDetails;
}

module.exports = router;

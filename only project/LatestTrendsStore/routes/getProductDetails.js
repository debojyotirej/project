var express = require('express');
var router = express.Router();
var {MongoClient} = require("mongodb");
var mongoClient = new MongoClient("mongodb://127.0.0.1:27017");

/* GET home page. */
router.post('/', function(req, res, next) {

    console.log("req.session.isLoggedInUser " + req.session.isLoggedInUser);
    var productData = {}
    getDbConnection().then((pData)=> {
        productData = pData;
        productData = JSON.stringify(productData);
        res.send(productData);
    });
});

async function getDbConnection() {
    await mongoClient.connect();
    var db = mongoClient.db("latest-trends");
    var collection = db.collection('productDetails');
    var result = collection.find({}).toArray();
    return result;
}

module.exports = router;

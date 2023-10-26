var express = require("express");
var router = express.Router();
var {MongoClient}= require("mongodb");
const bcrypt = require('bcrypt');
const saltRounds = 10;

var mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
var userResponse = {};
router.post('/', (req, res) => {
    var productData = req.body; 
    
        getDbConnection(productData).then((userData)=> {
            userResponse.msg = 'Done';
            res.send(JSON.stringify(userResponse));
        });
});

async function getDbConnection(data) {
    await mongoClient.connect();
    var db = mongoClient.db("latest-trends");
    var collection = db.collection('productDetails');
    var result = collection.insertOne(data, (error) => {
        return 'done';
    });
}

module.exports = router;


const express = require('express');
var router = express.Router();
router.use(express.static(require('path').join(__dirname, "public")))
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://hungtvgch18506_jerry:0856590811aa@cluster0-hym8t.mongodb.net/test';

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/insert', function (req, res) {
    res.render('insertCustomer');
})

router.get('/update', async (req, res) => {
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;

    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDB");
    let result = await dbo.collection("customers").findOne({ "_id": ObjectID(id) });
    res.render('update', { customers: result });
})

router.post('/doUpdate', async (req, res) => {
    let id = req.body.id;
    let name = req.body.txtName;
    let add = req.body.txtAddress;
    let amou = req.body.txtAmount;

   
    if(add.includes('vnđ'))
    {
        let newValues = { $set: { name: name, address : add, amount : amou }};
        var ObjectID = require('mongodb').ObjectID;

    let condition = { "_id": ObjectID(id) };

    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDB");
    await dbo.collection("customers").updateOne(condition, newValues);

    let results = await dbo.collection("customers").find({}).toArray();
    res.render('allCustomer', { customers: results });
    }

    else{
        res.send("Can not update");
    }

    
})

router.get('/delete', async (req, res) => {
    let id = req.query.id;
    var ObjectID = require('mongodb').ObjectID;
    let condition = { "_id": ObjectID(id) };
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDB");
    await dbo.collection("customers").deleteOne(condition);
    //console.log(id);
    let results = await dbo.collection("customers").find({}).toArray();
    res.render('allCustomer', { customers: results });
})


router.get('/allCus', async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDB");

    let results = await dbo.collection("customers").find({}).toArray();
    res.render('allCustomer', { customers: results });
})

router.post('/insertCustomer', async (req, res) => {
    let client = await MongoClient.connect(url);
    let dbo = client.db("MyDB");
    let nameValue = req.body.txtName;
    let addressValue = req.body.txtAddress;
    let amountValue = req.body.txtAmount;
    if(addressValue.includes('vnđ'))
    {
        let newCustomer = { name: nameValue, address: addressValue , amount : amountValue};
    await dbo.collection("customers").insertOne(newCustomer);

    let results = await dbo.collection("customers").find({}).toArray();
    res.render('allCustomer', { customers: results });
    }

    else{
        res.redirect('/insert');
    }
})

module.exports = router;
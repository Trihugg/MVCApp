const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('productHome');
})
router.get('/product',(req,res)=>{
    //passing model to view 
    res.render('about',{
        name: "a",
        job: "studenet"
    });
})
module.exports = router;
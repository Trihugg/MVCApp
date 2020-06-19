const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('index');
})

router.get('/about',(req,res)=>{
    //passing model to view 
    res.render('about',{
        name: "TVH",
        job: "studenet"
    });
})
module.exports = router;
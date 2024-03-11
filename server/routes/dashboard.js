const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const jwt = require('jsonwebtoken');
require('dotenv').config()

// router.use((req, res, next) => {
//     //console.log("req", req)
//     console.log("authenticating!!")
//     if (!req.headers.authentication) {
//         return res.status(401).send({ success: 0, message: "authentication failed" });
//     }
//     const access_token = req.headers.authentication.split(' ')[1];
//     console.log("access_token", access_token, process.env.JWTSECRET)
//     jwt.verify(access_token, process.env.JWTSECRET, (err, user) => {
       
//        console.log("err", err)
//        if (err) return res.status(401).send({ success: 0, message: "authentication failed" });
//        console.log("user", user)
   
//        next()
//     })
 
// })

router.get('/', function (req, res) {
    console.log(models)
    try {
        models.Product.count().then((response)=>res.send({  
            success: 1,
            data: response
        }))
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

module.exports = router
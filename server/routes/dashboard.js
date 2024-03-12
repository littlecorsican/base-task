const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
var moment = require('moment'); // require
moment().format();
const Op = Sequelize.Op;
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

router.get('/count', function (req, res) {
    try {
        let value1 = null
        let value2 = null
        let value3 = null
        let value4= null
        const query1 = models.Product.count().then((response)=>value1=response)

        const query2 = models.Product.max('price').then((response)=>value2=response)

        const query3 = models.Product.min('price').then((response)=>value3=response)

        const query4 = models.Product.count({where: {
            createdAt: {
                [Op.gte]: moment().subtract(1, 'days').toDate()
            }
          }}).then((response)=>value4=response)
        
        Promise.all([query1, query2, query3, query4]).then(function(values) {
            res.send({  
                success: 1,
                data: {
                    query1: values[0],
                    query2: values[1],
                    query3: values[2],
                    query4: values[3]
                }
            })
        }); 
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})



module.exports = router
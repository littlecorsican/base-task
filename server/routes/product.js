const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const Op = Sequelize.Op; 

// router.use((req, res, next) => {
//     //console.log("req", req)
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

router.get('/', function (req, res) { // Get all with pagination
    const {limit, offset} = req.query
    console.log(req)
    console.log(limit, offset)
    try {
        models.Product.findAll({
            limit: limit,
            offset: offset
        }).then((response)=>res.send({  
            success: 1,
            data: response,
            limit: limit,
            offset: offset
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.get('/search', function (req, res) { // Get all with search
    const {limit, offset, search} = req.query
    console.log(limit, offset, search)
    try {
        models.Product.findAll({
            limit: limit,
            offset: offset,
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        }).then((response)=>res.send({  
            success: 1,
            data: response,
            limit: limit,
            offset: offset
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.get('/:id', function (req, res) { // Get one by id
    const id = req.params.id
    console.log("id",id)
    // models.Product.findOne({ where: { id } }).then((response)=>console.log(response))
    try {
        models.Product.findOne({ where: { id } })
        .then((response)=>res.send({  
            success: 1,
            data: response
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.put('/:id', async function (req, res) { // Update one by id
    const id = req.params.id
    console.log(req.body)
    console.log({ ...req.body })
    try {
        models.Product.update({ ...req.body }, {
            where: {
                id
            }
        }).then((response)=>{
            res.send({  
                success: 1,
                data: response
            });
        })
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.post('/', async function (req, res) { // Create new one

    try {
        const result = await models.Product.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "Product created"
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
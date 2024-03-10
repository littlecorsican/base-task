const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const jwt = require('jsonwebtoken');
require('dotenv').config()

router.use((req, res, next) => {
    //console.log("req", req)
    if (!req.headers.authentication) {
        return res.status(401).send({ success: 0, message: "authentication failed" });
    }
    const access_token = req.headers.authentication.split(' ')[1];
    console.log("access_token", access_token, process.env.JWTSECRET)
    jwt.verify(access_token, process.env.JWTSECRET, (err, user) => {
       
       console.log("err", err)
       if (err) return res.status(401).send({ success: 0, message: "authentication failed" });
       console.log("user", user)
   
       next()
    })
 
})


router.get('/dashboard', function (req, res) {
    try {
        models.Task.count().then((response)=>res.send({  
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

router.get('/:id', function (req, res) {

    const id = req.params
    console.log("id",id)

    models.Task.findOne({ where: { id } }).then((response)=>console.log(response))


    res.send('Hello World');
})

router.get('/', function (req, res) {
    models.Task.findAll().then((response)=>console.log(response))


    res.send('Hello World');
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.Task.update({ id, ...req.body })
    console.log(result)
    res.send(result);
})

router.post('/', async function (req, res) {
    
    console.log("1111", req.body)
    console.log("2222", { ...req.body })
    try {
        const result = await models.Task.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "Task created"
        });
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.post('/changeStatus', async function (req, res) {
    
    console.log(req.body.from, req.body.to)
    const result = await models.Task.update({ status: req.body.to }, {
        where: {
          id: req.body.from,
        },
      }
    )
    console.log(result)
    res.send(result);
})


module.exports = router
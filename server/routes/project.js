const express=require('express')
const router=express.Router()
const models = require('../models/index')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
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

router.get('/', function (req, res) {
    models.Project.findAll(
        {
            include: [
                {
                    model: models.User,
                    required: true,
                    as: 'user'
                }
                // { 
                //     model: models.Task,
                //     required: false,
                //     as: 'task',
                //     include: [
                //         { 
                //             model: models.Status,
                //             required: false,
                //             as: 'task_status'
                //         }
                //     ],
                // }
            ],
        }
    ).then((response)=>res.send(response))
})


router.get('/dashboard', function (req, res) {
    try {
        models.Project.count().then((response)=>res.send({  
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
    const { id } = req.params
    console.log("id",id)
    models.Project.findOne({ where: { id }, include: [{ model: models.Task, required: false, as: 'task' }] })
    .then((response)=>{
        console.log("response", response)
        res.send(response)
    })
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.Project.update({ id, ...req.body })
    console.log(result)
    res.send(result);

})

router.delete('/:id', async function (req, res) {

    try {
        const id = req.params
        const result = await models.Project.destroy({
            where: id
        })
        console.log(result)
        res.send({  
            success: 1,
            message: "Delete success"
        });
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }

})

router.post('/', async function (req, res) {

    try {
        const result = await models.Project.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "Project created"
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
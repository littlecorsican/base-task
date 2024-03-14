const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSignature = require('../helper/jwtSignature')
const { Sequelize } = require('sequelize');
require('dotenv').config()


router.get('/:id', function (req, res) {
    const id = req.params
    models.User.findOne({ where: { id } }).then((response)=>res.send(response))
})

router.get('/', function (req, res) {
    const {limit, offset} = req.query
    models.User.findAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'email', 'name'],
        include: [
            {
                model: models.User_Permission, 
                as: 'user_permission',
                include: [
                    {
                        model: models.Permission,
                        as: 'permission',
                    }
                ]
            }
        ]
    })
    .then((response)=>res.send({  
        success: 1,
        data: response,
        limit: limit,
        offset: offset
    }))
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.User.update({ id, ...req.body })
    console.log(result)
    res.send(result);
})

router.post('/login', async function (req, res) {
    console.log(process.env.JWTSECRET) 
    console.log(req.body)
    const email = req.body.email
    
    models.User.findOne({ 
        where: { email },
        include: [
            {
                model: models.User_Permission, 
                as: 'user_permission'
            }
        ]
    }).then((user)=>{
        console.log("user", user)
        console.log("user_permission", user.user_permission)
        if (!user) {
            res.status(401).send({
                success: 0,
                message: "User not found"
            })
        }
        console.log("password", user.password) // password from database
        console.log("email", user.email) // password from database
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            console.log("result", result)
            if(!result){
                res.status(401).send({
                    success: 0,
                    message: "Passwords do not match"
                })
            } else {

                let data = { 
                    time: new Date(), 
                    email: user.email,
                    id: user.id,
                    permissions: [
                        ...user.user_permission
                    ]
                }
                console.log("data", data)
                const token = jwtSignature(data)
                console.log("token", token)
                res.status(200).send({
                    success: 1,
                    message: "",
                    access_token: token,
                    email: user.email,
                    name: user.name,
                    rank: user.rank
                })
            }
            
        });
    })
})

router.post('/register', async function (req, res) {
    
    console.log(req.body)
    const email = req.body.email
    // CHECK IF USER EXSISTS
    models.User.findOne({ where: { email } }).then((user)=>{
        console.log("user", user)
        if (user) {
            res.status(401).send({
                success: 0,
                message: "Email has already been registered"
            })
        } else {
            // GENERATE HASH FROM PASSWORD
            bcrypt.genSalt(parseInt(process.env.SALTROUNDS), function(err, salt) {
                console.log("salt", salt, err)
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    console.log("hash", hash, err)
                    try {
                        await models.sequelize.transaction(async function(transaction) {
                            const user = await models.User.create(
                                { ...req.body, password: hash},
                                {transaction}
                            )
                            const id = user.dataValues.id
                            const user_permission_1 = await models.User_Permission.create(
                                { user_id: id, permission_id: 1 },
                                {transaction}
                            )
                            const user_permission_2 = await models.User_Permission.create(
                                { user_id: id, permission_id: 2 },
                                {transaction}
                            )
                            const user_permission_3 = await models.User_Permission.create(
                                { user_id: id, permission_id: 3 },
                                {transaction}
                            )
                            const user_permission_4 = await models.User_Permission.create(
                                { user_id: id, permission_id: 4 },
                                {transaction}
                            )
                            console.log("user", user)
                            if (user) {
                                return res.status(200).send({
                                    success: 1,
                                    message: "Register success"
                                })
                            }
                            res.status(401).send({
                                success: 0,
                                message: "Registeration failed"
                            })

                        });
                    } catch (e) {
                        console.log("E", e)
                        res.status(401).send({
                            success: 0,
                            message: "Registeration failed"
                        })
                    }
                });
            });
        }
    });

})

router.post('/verify', async function (req, res) {
    console.log(process.env.JWTSECRET) 
    console.log(req.body)
    const access_token = req.body.access_token
    console.log("access_token", access_token)

    jwt.verify(access_token, process.env.JWTSECRET, (err, user) => {
        console.log("err", err)
    
        if (err) return res.status(403).send({ success: 0, message: "authentication failed" });
        console.log("user", user)
    
        return res.status(200).send({ success: 1, message: "authentication success" });
    })
})

router.post('/grantpermission/:id', async function (req, res) {
    const id = req.params.id
    const permission = req.body.permission
    console.log("1111", permission, id)
    try {
        let permission_code = await models.Permission.findOne({ where: { name: permission } })
        console.log("permission_code", permission_code, permission_code.id)
        let result = await models.User_Permission.findOne({ where: { user_id: id, permission_id: permission_code.id } })
        console.log(req.body.permission)
        if (result) {
            return res.status(200).send({
                success: 0,
                message: "User already have that permission"
            })
        }
        result = await models.User_Permission.create({ user_id: id, permission_id: permission_code.id })
        console.log(result)
        return res.status(200).send({
            success: 1,
            message: "Permission granted"
        })
    } catch (e) {
        return res.status(500).send({
            success: 0,
            message: e.toString()
        })
    }
})

router.post('/removepermission/:id', async function (req, res) {
    const id = req.params.id
    const permission = req.body.permission
    console.log(permission, id)
    try {
        // find ID of that permission code
        let permission_code = await models.Permission.findOne({ where: { name: permission } })
        let result = await models.User_Permission.findOne({ where: { user_id: id, permission_id: permission_code.id } })
        console.log(req.body.permission)
        if (!result) {
            return res.status(200).send({
                success: 0,
                message: "User dont have that permission"
            })
        }
        result = await models.User_Permission.destroy({ where: { user_id: id, permission_id: permission_code.id } })
        console.log(result)
        return res.status(200).send({
            success: 1,
            message: "Permission revoked"
        })
    } catch (e) {
        return res.status(500).send({
            success: 0,
            message: e.toString()
        })
    }
})

module.exports = router
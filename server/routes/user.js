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
    const result = await models.User.update({ id, ...req.body })
    res.send(result);
})

router.post('/login', async function (req, res) {
    const email = req.body.email
    
    models.User.findOne({ 
        where: { email },
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
    }).then((user)=>{
        if (!user) {
            res.status(401).send({
                success: 0,
                message: "User not found"
            })
        }
        bcrypt.compare(req.body.password, user.password, function(err, result) {
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
                const token = jwtSignature(data)
                res.status(200).send({
                    success: 1,
                    access_token: token,
                    email: user.email,
                    name: user.name,
                    permissions: user.user_permission
                })
            }
            
        });
    })
})

router.post('/register', async function (req, res) {
    
    const email = req.body.email
    // CHECK IF USER EXSISTS
    models.User.findOne({ where: { email } }).then((user)=>{
        if (user) {
            res.status(401).send({
                success: 0,
                message: "Email has already been registered"
            })
        } else {
            // GENERATE HASH FROM PASSWORD
            bcrypt.genSalt(parseInt(process.env.SALTROUNDS), function(err, salt) {
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
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

router.post('/grantpermission/:id', async function (req, res) {
    const id = req.params.id
    const permission = req.body.permission
    try {
        let permission_code = await models.Permission.findOne({ where: { name: permission } })
        let result = await models.User_Permission.findOne({ where: { user_id: id, permission_id: permission_code.id } })
        if (result) {
            return res.status(200).send({
                success: 0,
                message: "User already have that permission"
            })
        }
        result = await models.User_Permission.create({ user_id: id, permission_id: permission_code.id })
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
    try {
        // find ID of that permission code
        let permission_code = await models.Permission.findOne({ where: { name: permission } })
        let result = await models.User_Permission.findOne({ where: { user_id: id, permission_id: permission_code.id } })
        if (!result) {
            return res.status(200).send({
                success: 0,
                message: "User dont have that permission"
            })
        }
        result = await models.User_Permission.destroy({ where: { user_id: id, permission_id: permission_code.id } })
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
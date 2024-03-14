const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const models = require('../models/index')
const { Sequelize } = require('sequelize');
const authenticate = require('../helper/authenticate')
require('dotenv').config()

router.use((req, res, next) => {
    authenticate(req, res, next) 
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
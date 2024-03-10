const express=require('express')
const router=express.Router()
const models = require('../models/index')

router.get('/', function (req, res) {
    models.Status.findAll().then((response)=>res.send(response))
})

module.exports = router
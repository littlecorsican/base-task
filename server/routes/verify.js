const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const jwtSignature = require('../helper/jwtSignature')
require('dotenv').config()


router.post('/', async function (req, res) {
    const access_token = req.body.access_token

    jwt.verify(access_token, process.env.JWTSECRET, (err, user) => {
        console.log("err", err)
    
        if (err) return res.status(403).send({ success: 0, message: "authentication failed" });
    
        return res.status(200).send({ success: 1, message: "authentication success" });
    })
})


module.exports = router
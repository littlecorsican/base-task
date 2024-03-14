require('dotenv').config()
const jwt = require('jsonwebtoken');

// return a generated jwt singature
const jwtSignature = (data) => {
    return jwt.sign(
        data,
        process.env.JWTSECRET,
        { 
            expiresIn: process.env.TOKEN_EXPIRY
        }
    );
};


module.exports = jwtSignature


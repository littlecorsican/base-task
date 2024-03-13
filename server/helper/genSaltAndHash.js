const bcrypt = require('bcrypt');
require('dotenv').config();

const genSaltAndHash=(password)=>{
    console.log("process.env.SALTROUNDS", process.env.SALTROUNDS)
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
    const hash = bcrypt.hashSync(password, salt);
    console.log("hash", hash)
    return hash
}

module.exports = genSaltAndHash
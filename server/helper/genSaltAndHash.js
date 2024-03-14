const bcrypt = require('bcrypt');
require('dotenv').config();

const genSaltAndHash=(password)=>{
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

module.exports = genSaltAndHash
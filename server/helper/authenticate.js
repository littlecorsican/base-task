const jwt = require('jsonwebtoken');
const role = require('./role')

const authenticate = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).send({ success: 0, message: "no bearer token" });
  }

  let path = req.originalUrl.split("?")[0]
  if (path.split("/").length > 1) path = path.split("/")[2].trim()
  const method = req.method
  const access_token = req.headers.authorization.split(' ')[1];
  const decoded_data = jwt.decode(access_token)
  const havePermission=role({
    email: decoded_data?.email,
    method,
    endpoint: path
  })
  if (!havePermission) return res.status(400).send({ success: 0, message: "insufficient permission" });

  try {
    const decoded = jwt.verify(access_token, process.env.JWTSECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("error", error)
    return res.status(400).send({ success: 0, message: "authentication failed" });
  }
};


module.exports = authenticate
const jwt = require('jsonwebtoken');
const secretKey = 'secret_key';

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Access Denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send('Invalid Token.');
  }
};

// app.get('/protected', authenticate, (req, res) => {
//   res.send('Welcome to the protected route');
// });

module.exports = authenticate

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
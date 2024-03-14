var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors({
   origin: '*'
}));

const router = express.Router()

const userRoute=require('./routes/user')
const productRoute=require('./routes/product')
const dashboardRoute=require('./routes/dashboard')
const verifyRoute=require('./routes/verify')
const permissionRoute=require('./routes/permission')

app.use('/api/user', userRoute)
app.use('/api/inventory', productRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/verify', verifyRoute)
app.use('/api/permission', permissionRoute)

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:8081", host, port)
})

module.exports = server
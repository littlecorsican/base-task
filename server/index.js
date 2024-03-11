var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors({
   origin: '*'
}));

const router = express.Router()

const userRoute=require('./routes/user')
const productRoute=require('./routes/product')
const containerRoute=require('./routes/container')
const dashboardRoute=require('./routes/dashboard')

app.use('/api/user', userRoute)
app.use('/api/inventory', productRoute)
app.use('/api/container', containerRoute)
app.use('/api/dashboard', dashboardRoute)

// router.use(() => {}); // General middleware
// router.get('/route1', () => {})
// router.get('/route2', () => {})
// router.post('/route2', () => {})


app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:8081", host, port)
})
var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors({
   origin: '*'
}));

const router = express.Router()

const userRoute=require('./routes/user')
const taskRoute=require('./routes/task')
const projectRoute=require('./routes/project')
const statusRoute=require('./routes/status')
const productRoute=require('./routes/product')
const containerRoute=require('./routes/container')

app.use('/api/user', userRoute)
app.use('/api/task', taskRoute)
app.use('/api/project', projectRoute)
app.use('/api/status', statusRoute)
app.use('/api/inventory', productRoute)
app.use('/api/container', containerRoute)

// router.use(() => {}); // General middleware
// router.get('/route1', () => {})
// router.get('/route2', () => {})
// router.post('/route2', () => {})


// const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//  'hello_world_db',
//  'DATABASE_USERNAME',
//  'DATABASE_PASSWORD',
//   {
//     host: 'DATABASE_HOST',
//     dialect: 'mysql'
//   }
// );

// app.prefix('/', function (home) {
//     // home.route('/').get(data.welcome); //other route
//     // home.route('/home').get(data.home); // other route
   
// });

app.get('/', function (req, res) {
   res.send('Hello World');
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://localhost:8081", host, port)
})
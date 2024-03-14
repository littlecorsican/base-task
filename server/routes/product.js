const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const sortToColumnMap = require('../enums/sortToColumnMap');
const { Sequelize } = require('sequelize');
const authenticate = require('../helper/authenticate')
require('dotenv').config();
const Op = Sequelize.Op; 

router.use((req, res, next) => {
    authenticate(req, res, next) 
})

router.get('/', function (req, res) { // Get all with pagination
    const {limit, offset, sortBy, contains} = req.query
    const sortBy_column = sortToColumnMap[sortBy.split(" ")[0]]
    const sortBy_order = sortBy.split(" ")[1]

    try {
        models.Product.findAll({
            limit: limit,
            offset: offset,
            where: {
                name: {
                    [Op.like]: `%${contains}%`
                }
            },
            order: [
                [sortBy_column, sortBy_order],
            ],
        }).then((response)=>res.send({  
            success: 1,
            data: response,
            limit: limit,
            offset: offset
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.get('/search', function (req, res) { // Get all with search
    const {limit, offset, search} = req.query
    try {
        models.Product.findAll({
            limit: limit,
            offset: offset,
            where: {
                name: {
                    [Op.like]: '%' + search + '%'
                }
            }
        }).then((response)=>res.send({  
            success: 1,
            data: response,
            limit: limit,
            offset: offset
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.get('/:id', function (req, res) { // Get one by id
    const id = req.params.id
    console.log("id",id)
    // models.Product.findOne({ where: { id } }).then((response)=>console.log(response))
    try {
        models.Product.findOne({ where: { id } })
        .then((response)=>res.send({  
            success: 1,
            data: response
        }))
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.put('/:id', async function (req, res) { // Update one by id
    const id = req.params.id
    console.log(req.body)
    console.log({ ...req.body })
    try {
        models.Product.update({ ...req.body }, {
            where: {
                id
            }
        }).then((response)=>{
            res.send({  
                success: 1,
                data: response
            });
        })
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.delete('/:id', async function (req, res) { // Update one by id
    const id = req.params.id
    try {
        models.Product.destroy({
            where: {
                id
            }
        }).then((response)=>{
            res.send({  
                success: 1,
                data: response
            });
        })
    } catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.post('/', async function (req, res) { // Create new one

    try {
        const result = await models.Product.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "Product created"
        });
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

module.exports = router
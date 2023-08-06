const route = require('express').Router()
const aController = require('../controllers/about.controller')
const guardAuth = require('./guardAuth')

route.get('/about', aController.getaboutPage)


module.exports = route


const route = require('express').Router()
const cController = require('../controllers/contact.controller')

route.get('/contact', cController.getcontactPage)


module.exports = route
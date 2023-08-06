
const route = require('express').Router()
const bodyparser = require('express').urlencoded({ extended: true })
const authController = require('../controllers/auth.controller')
const guardAuth = require('./guardAuth')

route.get('/register', guardAuth.isNotAuth, authController.getRegisterPage)
route.post('/register', bodyparser, authController.postregisterData)

route.get('/login', guardAuth.isNotAuth, authController.getLoginPage)
route.post('/login', bodyparser, authController.postLoginData)
route.post('/logout', authController.logout)



module.exports = route
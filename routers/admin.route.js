

const route = require('express').Router()
const adminController = require('../controllers/admin.controller')

route.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
route.get('/dashusers', adminController.usersController)
route.get('/dashbooks', adminController.booksController)

module.exports = route
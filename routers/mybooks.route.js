
const route = require('express').Router()
const guardAuth = require('./guardAuth')
const bookController = require('../controllers/book.controller')
const multer = require("multer")

route.get('/mybooks', guardAuth.isAuth, bookController.getMyBooksController)
route.get('/mybooks/delete/:id', guardAuth.isAuth, bookController.deleteBookController)
route.get('/mybooks/update/:id', bookController.getMybookUpdatePage)


route.post('/mybooks/update', multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })
}).single('image'), bookController.postUpdateBookContoller)

module.exports = route
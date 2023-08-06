const multer = require('multer')

const bookController = require('../controllers/book.controller')
const route = require('express').Router()
const guardAuth = require("./guardAuth")




route.get('/books', guardAuth.isAuth, bookController.getBookPageBooksController)
route.get('/books/:id', guardAuth.isAuth, bookController.getBookDetailsController)

route.get('/addbook', guardAuth.isAuth, bookController.getaddBookController)
route.post('/addbook', multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'assets/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })

}).single('image'), guardAuth.isAuth, bookController.postaddBookController)
//even though asssets is static folder ,sta3mlna assets/uploads 7it in multer we should keep the whole path 




module.exports = route
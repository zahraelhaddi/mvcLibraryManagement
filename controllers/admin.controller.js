


const bookModel = require('../models/book.model')
const userModel = require('../models/auth.model')

exports.booksController = (req, res, next) => {
    bookModel.getallBooks().then((books) => {
        res.render('dashboardbooks', { books: books })
    })

}

exports.usersController = (req, res, next) => {
    userModel.getallUsers().then((users) => {
        res.render('dashboardusers', { users: users })
    })

}
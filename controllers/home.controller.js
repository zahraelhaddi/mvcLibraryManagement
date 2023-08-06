

const HomeModel = require('../models/book.model');


exports.getthreebooksController = (req, res, next) => {
    HomeModel.getthreebooks().then(books => {
        res.render('index', { books: books, verifUser: req.session.userId })
    })
}

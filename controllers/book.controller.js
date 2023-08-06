
const bookModel = require('../models/book.model')

exports.getBookPageBooksController = (req, res, next) => {
    bookModel.getallBooks().then(books => {
        res.render('books', { books: books, verifUser: req.session.userId })
    })
}

exports.getBookDetailsController = (req, res, next) => {
    bookModel.getOneBookDetails(req.params.id).then((book) => {
        res.render('details', { book: book, verifUser: req.session.userId })
    })
}


exports.getaddBookController = (req, res, next) => {
    res.render('addbook', { verifUser: req.session.userId, Smessage: req.flash('successMessage')[0], Emessage: req.flash('errorMessage')[0] })
}

exports.postaddBookController = (req, res, next) => {
    //console.log(req.body)
    const filename = req.file.filename
    const id = req.session.userId
    //console.log(id)
    //res.redirect('addbook')

    bookModel.postaddBook(req.body.title, req.body.description, req.body.author, req.body.price, filename, id).then((msg) => {
        req.flash('successMessage', msg)
        res.redirect('/addbook')
    }).catch((err) => {
        req.flash('errorMessage', err)
        res.redirect('/addbook')
    })

}


exports.getMyBooksController = (req, res, next) => {
    bookModel.getMyBooks(req.session.userId).then((books) => {
        res.render('mybooks', { books: books, verifUser: req.session.userId })
    })
}


exports.deleteBookController = (req, res, next) => {
    let id = req.params.id
    bookModel.deleteBook(id).then((verif) => {
        res.redirect('/mybooks')
    }).catch((err) => {
        console.log(err)
    })
}



exports.getMybookUpdatePage = (req, res, next) => {
    let id = req.params.id
    bookModel.getPageUpdateBookModel(id).then((book) => {
        //console.log(book)
        res.render('updateBook', { updatebook: book, verifUser: req.session.userId, Smessage: req.flash('Successmessage')[0], Emessage: req.flash('Errormessage')[0] })
    })



}

exports.postUpdateBookContoller = (req, res, next) => {
    if (req.file) {
        bookModel.postUpdateBookModel(req.body.bookId, req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userId).then((msg) => {
            req.flash('Successmessage', msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err) => {
            req.flash('Errormessage', err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    } else {
        bookModel.postUpdateBookModel(req.body.bookId, req.body.title, req.body.description, req.body.author, req.body.price, req.body.oldImage, req.session.userId).then((msg) => {
            req.flash('Successmessage', msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err) => {
            req.flash('Errormessage', err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }





}
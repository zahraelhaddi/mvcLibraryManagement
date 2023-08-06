

const mongoose = require('mongoose')

var url = "mongodb+srv://ZahraAdmin:ZahraAdmin1@cluster0.nbwvnkd.mongodb.net/library"
var schemaBooks = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    author: String,
    image: String,
    userId: String
})

var book = mongoose.model('book', schemaBooks)



exports.getthreebooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return book.find({}).limit(3)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })

}
exports.getallBooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return book.find({})
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })

}


exports.getOneBookDetails = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return book.findById(id)
        }).then(book => {
            mongoose.disconnect()
            resolve(book)
        }).catch(err => reject(err))
    })

}


exports.postaddBook = (title, description, author, price, image, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            let newbook = new book({
                title: title,
                description: description,
                author: author,
                price: price,
                image: image,
                userId: userId
            })
            return newbook.save()
        }).then(() => {
            mongoose.disconnect();
            resolve('book added !');
        }).catch((err) => {
            mongoose.disconnect()
            reject(err);
        })
    })
}



exports.getMyBooks = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return book.find({ userId: id })
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))
    })
}

exports.deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return book.deleteOne({ _id: id })
        }).then(books => {
            mongoose.disconnect()
            resolve(true)
        }).catch(err => reject(err))
    })
}

exports.getPageUpdateBookModel = (id) => {
    return new Promise((resolve, reject) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return book.findById(id)

        }).then(books => {
            mongoose.disconnect()
            resolve(books)

        }).catch(err => reject(err))




    })


}

exports.postUpdateBookModel = (bookId, title, description, author, price, filename, userId) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

            return book.updateOne({ _id: bookId }, { title: title, description: description, author: author, image: filename, price: price, userId: userId })


        }).then(() => {
            mongoose.disconnect()
            resolve('Updated!')
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })

}


/**exports.postuser = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            let newbook = new book({
                title: req.body.
            })
        })
    })
}*/



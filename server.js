

// const express = require('express')
// const app = express()
// const studentsroute = require('./routes/studentsRoute.js')
// const mongoose = require('mongoose')

// app.use(studentsroute)

// var url = "mongodb+srv://ZahraAdmin:ZahraAdmin1@cluster0.nbwvnkd.mongodb.net/ApiStudents"
// var schemauser = mongoose.Schema({
//     firstname: String,
//     age: Number,
//     speciality: String
// })
// //model bima3na collection
// var User = mongoose.model('user', schemauser)


// app.get('/', (req, res) => {
//     mongoose.connect(url).then(
//         res => {
//             console.log("db connected!")

//         }

//     )
//     mongoose.disconnect()
//     console.log("disconnected")
// })



// app.get('/addfields', (req, res) => {
//     mongoose.connect(url).then(res => {
//         // let std = new user({
//         //     'firstname': 'zahra',
//         //     'age': 20,
//         //     'speciality': 'cs'
//         // })
//         // std.save()
//         User.insertMany({
//             'firstname': 'zahra',
//             'age': 20,
//             'speciality': 'cs'
//         }).then(() => {
//             mongoose.disconnect()
//         })

//     })
// })




// app.get('/readData', (req, res) => {
//     mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(async res => {
//         //const docs = await User.findOne({ _id: '64bbe3901a2542d51df36b48' });
//         const docs = await User.find();
//         console.log(docs);
//     }).catch((err) => { console.error('Error connecting to MongoDb', err) });
// })



// app.get('/updateData', (req, res) => {
//     mongoose.connect(url).then(async res => {
//         // const doc = await User.findOne({ '_id': '64bbe3901a2542d51df36b48' })
//         // doc.firstname = 'mohamed'
//         // doc.age = 30
//         // doc.save()

//         await User.updateOne({ '_id': '64bbe3901a2542d51df36b48' }, { firstname: 'mohamad elhadi', age: 30 })
//     }).catch((err) => { console.error('hawa mochkil', err) })
// })

// app.get('/deleteData', (req, res) => {
//     mongoose.connect(url).then(async (res) => {
//         await User.deleteOne({ _id: '64bbe56ad8610a28e503e039' })
//     }).catch((err) => {
//         console.error('ERROR IS IN HHHHHHHHHHHHHHHHHHERE', err)
//     })
// })



// app.listen(5000, () => { console.log('server is running on port 5000') })

const ejs = require('ejs')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const homeRouter = require('./routers/home.route')
const bookRouter = require('./routers/book.route')
const authRouter = require('./routers/auth.route')
const mybooksRouter = require('./routers/mybooks.route')
const contactRouter = require('./routers/contact.route')
const aboutRouter = require('./routers/about.route')
const adminRouter = require('./routers/admin.route')
const flash = require('connect-flash')

//session storage and cookies for login and profiles
const session = require('express-session')
const MongodbStore = require('connect-mongodb-session')(session)


var store = new MongodbStore({
    uri: "mongodb+srv://ZahraAdmin:ZahraAdmin1@cluster0.nbwvnkd.mongodb.net/library",
    collection: "mySessions"
})




app.use(session({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'assets')))


app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }));



/**app.get('/', (req, res) => {
    res.render('index')
})*/
app.use(flash())
app.use(homeRouter)
app.use(bookRouter)
app.use(authRouter)
app.use(mybooksRouter)
app.use(contactRouter)
app.use(aboutRouter)
app.use(adminRouter)
/**app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/books', (req, res) => {
    res.render('books')
})

app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/details', (req, res) => {
    res.render('details')
})*/


// app.get('/about', (req, res, next) => {
//     res.render('about')
// })

// app.get('/contact', (req, res, next) => {
//     res.render('contact')
// })



// app.get('/about', (req, res, next) => {
//     res.render('about', { verifUser: req.session.userId })
// })
// app.get('/contact', (req, res, next) => {
//     res.render('contact', { verifUser: req.session.userId })
// })





// app.get('/tables/books', (req, res) => {
//     res.render('dashboardTables')
// })




app.listen(5000, () => { console.log('server is running on port 5000') })
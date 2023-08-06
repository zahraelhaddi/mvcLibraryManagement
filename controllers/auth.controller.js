

const authModel = require('../models/auth.model')
const bodyparser = require('body-parser')


exports.getRegisterPage = (req, res, next) => {
    //console.log(req.flash('error'))  THIS GIVES AS A RESULT : an array 
    res.render('register', { verifUser: req.session.userId, message: req.flash('error')[0] })
}

exports.postregisterData = (req, res, next) => {
    authModel.RegisterUser(req.body.name, req.body.email, req.body.password).then((user) => {
        res.redirect('/login')
    }).catch((err) => {
        req.flash('error', err)
        res.redirect('/register')
    })

}

exports.getLoginPage = (req, res, next) => {
    res.render('login', { verifUser: req.session.userId, message: req.flash('error')[0] })
}


exports.postLoginData = (req, res, next) => {

    authModel.loginData(req.body.email, req.body.password).then((id) => {

        req.session.userId = id
        res.redirect('/')
    }).catch((err) => {
        req.flash('error', err)
        res.redirect('/login')

    })


}
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}






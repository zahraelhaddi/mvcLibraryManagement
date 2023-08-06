

exports.getaboutPage = (req, res, next) => {
    res.render('about', { verifUser: req.session.userId })
}
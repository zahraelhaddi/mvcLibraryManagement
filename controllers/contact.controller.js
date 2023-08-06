

exports.getcontactPage = (req, res, next) => {
    res.render('contact', { verifUser: req.session.userId })
}
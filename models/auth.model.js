
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


var url = "mongodb+srv://ZahraAdmin:ZahraAdmin1@cluster0.nbwvnkd.mongodb.net/library"

var AuthSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

var user = mongoose.model('user', AuthSchema)

exports.RegisterUser = (name, email, password) => {
    // test email if exist (true go to login) (false add this user to users collection)
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return user.findOne({ email: email });
        }).then((user) => {
            if (user) {
                mongoose.disconnect();
                reject('email is used');


            } else {
                return bcrypt.hash(password, 10);
            }
        }).then((hPassword) => {
            let newUser = new user({
                name: name,
                email: email,
                password: hPassword
            });
            return newUser.save();
        }).then(() => {
            mongoose.disconnect();
            resolve('registered !');
        }).catch((err) => {
            mongoose.disconnect()
            reject(err);
        })
    })
};


exports.loginData = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return user.findOne({ email: email })
        }).then((hadakuser) => {
            if (hadakuser) {
                bcrypt.compare(password, hadakuser.password).then((verif) => {
                    if (verif == true) {
                        mongoose.disconnect()
                        resolve(hadakuser._id)
                    } else {
                        mongoose.disconnect()
                        reject("password is incorrect")
                    }
                })
            } else {
                mongoose.disconnect()
                reject('not registered')
            }
        }).catch((err) => {
            mongoose.disconnect()
            reject(err)
        })
    })
}




exports.getallUsers = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return user.find({})
        }).then(users => {
            mongoose.disconnect()
            resolve(users)
        }).catch(err => reject(err))
    })
}


/**const express = require('express')
//now in routes we dont use app=express() instead we use express.Router()
const router = express.Router()

var bodyparser = require('body-parser')
bodyparser = bodyparser.urlencoded({ extended: true })

var Students = [
    { "id": 1, "name": "John", "age": 34, "gender": "male" },
    { "id": 2, "name": "zahra", "age": 20, "gender": "female" },
    { "id": 3, "name": "Jo", "age": 34, "gender": "male" }
]


router.get('/students', (req, res) => {
    res.send(Students);
})


//the crud operation that has params in its route it should be the last one to be written on the code
router.get('/students/:id', (req, res) => {
    let student = Students.find(student => student.id == req.params.id)
    if (student) {
        res.send(student)
    } else {
        res.send("Student with entered id does not exist!")
    }
})


router.delete('/students/delete/:id', (req, res) => {
    let studentToBeDeleted = Students.find(student => student.id == req.params.id)
    //res.send(studentToBeDeleted)
    let index = Students.indexOf(studentToBeDeleted)
    //res.send("it is the element of index " + Number(index))
    Students.splice(index, 1)
    res.send(Students)
})
router.delete('students/delete/:name', (req, res) => {
    let student = Students.find(student => Students.name == req.params.name)
    let index = Students.indexOf(student)
    Students.splice(index, 1)
    res.send(Students)
})

router.post('/students/addstudents', bodyparser, (req, res) => {
    if (!req.body.id) {
        var incrementedId = Students.length + 1;
        var newStudent = {
            id: incrementedId,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        }
        res.send(newStudent)

    } else {
        var newStudent = {
            id: req.body.id,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender
        }
        res.send(newStudent)
    }
    Students.push(newStudent)

})

router.patch('/students/update/:id', bodyparser, (req, res) => {
    var StudentToUpdate = Students.find(item => item.id == req.params.id)
    StudentToUpdate.name = req.body.name
    StudentToUpdate.age = req.body.age
    StudentToUpdate.gender = req.body.gender
    res.send(StudentToUpdate)
})

module.exports = router*/


const express = require("express")
const HomeController = require("../controllers/home.controller")
const route = express.Router()

//route.get('/', booksController.getthreebooksController)
route.get('/', HomeController.getthreebooksController)

module.exports = route;
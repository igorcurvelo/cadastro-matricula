
const StudentDao = require('../dao/student-dao');
const route = require('express').Router();

route.get('/registration', (req, res, next) => {
    new StudentDao(req.connection)
    .findAll()
    .then(students => res.json(students))
    .catch(next)
});

route.get('/registration/:id', (req, res, next) => {
    const id = req.params.id;
    new StudentDao(req.connection)
    .findOne(id)
    .then(student => res.json(student))
    .catch(next)
})

route.post('/registration', (req, res, next) => {
    var student = req.body
    new StudentDao(req.connection)
    .save(student)
    .then(insertId => {
        student.id = insertId
        res.json(student)
    }).catch(next)
});

route.put('/registrationa/:id', (req, res, next) => {
    const id = req.params.id;
    new StudentDao(req.connection)
    .update(id, req.body)
    .then(student => res.json(student))
    .catch(next)
})

module.exports = route;
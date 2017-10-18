const router = require('express').Router();
const {Student} = require('../db/models');
const {Campus} = require('../db/models')

router.get('/', function(req, res, next){
    Student.findAll({include: [Campus]})
    .then(students => res.json(students))
    .catch(next);
})

router.get('/:studentId', function(req, res, next) {
    const Id = req.params.studentId;
    Student.findById(Id, {include: [Campus]})
    .then(student => res.json(student))
    .catch(next);
})

router.post('/', function(req, res, next){
    console.log('heya remember to change me in student post', req.body)
    Student.create(req.body)
    .then(newStudent => res.json(newStudent))
    .catch(next);
})

router.put('/:studentId', function(req, res, next){
    const Id = req.params.studentId;
    console.log("Hello", req.body)
    Student.update( req.body, {where : {id : Id}})
    .then( () => Student.findById(Id) )
    .then(updatedStudent => res.json(updatedStudent))
    .catch(next);
})

router.delete('/:studentId', function(req, res, next){
    const Id = req.params.studentId;
    console.log("HELP : ",Id)
    // Student.destroy({where : {id: Id}})
    // .then( () => res.status(204).end())
    // .catch(next)
})

module.exports = router;
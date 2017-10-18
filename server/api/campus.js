const router = require('express').Router();
const {Campus} = require('../db/models');
const {Student} = require('../db/models')

router.get('/', function(req, res, next){
    console.log('wow')
    Campus.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
})

router.get('/:campusid', function(req, res, next){
    console.log('hi')
    const Id = req.params.campusid;
    Campus.findById(Id, {include: [Student]})
    .then(campus => res.json(campus))
    .catch(next);
})

router.post('/', function(req, res, next){
    // console.log("In the post route for campus", req.body)
    Campus.create(req.body)
    .then(newCampus => res.json(newCampus))
    .catch(next)
})

router.put('/:campusid', function(req, res, next){
    console.log('Hit the update', req.body)
    Campus.update(req.body, {where:{id:req.params.campusid}})
    .then(() => Campus.findById(req.params.campusid))
    .then(updatedCampus => res.json(updatedCampus) )
    .catch(next)
})

router.delete('/:campusid', function(req, res, next){
    console.log("id!!!", req.params.campusid)
    // Campus.destroy({where : {id: req.params.campusid}})
    // .then( ()=> res.status(204).end())
    // .catch(next);
})

module.exports = router;
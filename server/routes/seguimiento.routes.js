const express = require('express');
const router1 = express.Router();
const seguimiento = require('../controllers/seguimiento.controller');
const load = require('../controllers/load.controller');

router1.get('/students', seguimiento.getStudents);
router1.get('/courses', seguimiento.getCourses);
router1.get('/loadcollections', load.loadCollections);
router1.get('/studentsbycourse/:id', seguimiento.getStudentsByCourse);
router1.get('/', seguimiento.getStudentsCourse);


module.exports = router1;
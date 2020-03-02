const express = require('express');
const router1 =express.Router();
const seguimiento = require('../controllers/seguimiento.controller');

router1.get('/students', seguimiento.getStudents);
router1.get('/courses', seguimiento.getCourses);
router1.get('/', seguimiento.getStudentsCourse);



module.exports=router1;
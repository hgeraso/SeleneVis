const express = require('express');
const router1 =express.Router();
const course = require('../controllers/course.controller');

router1.get('/', course.getCourses);
router1.post('/',course.createCourse);
router1.get('/:id', course.getCourse);
router1.put('/:id', course.editCourse);
router1.delete('/:id',course.deleteCourse);





module.exports=router1;
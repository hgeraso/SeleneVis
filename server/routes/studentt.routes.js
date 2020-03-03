const express = require('express');
const router1 =express.Router();
const student = require('../controllers/studentt.controller');

router1.get('/', student.getStudentts);
router1.post('/',student.createStudentt);
router1.get('/:id', student.getStudentt);
router1.put('/:id', student.editStudentt);
router1.delete('/:id',student.deleteStudentt);





module.exports=router1;
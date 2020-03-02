const express = require('express');
const router1 =express.Router();
const seguimiento = require('../controllers/seguimiento.controller');

router1.get('/', seguimiento.getStudents);

module.exports=router1;
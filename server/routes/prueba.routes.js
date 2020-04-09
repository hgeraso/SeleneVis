const express = require('express');
const router =express.Router();
const pruebaCtrl = require('../controllers/prueba.controller');
router.get('/time', pruebaCtrl.getTime2);
router.get('/timeExam', pruebaCtrl.getTimeExam);






module.exports=router;

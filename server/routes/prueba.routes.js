const express = require('express');
const router =express.Router();
const pruebaCtrl = require('../controllers/prueba.controller');
router.get('/time', pruebaCtrl.getTime2);





module.exports=router;

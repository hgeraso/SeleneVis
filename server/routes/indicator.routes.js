const express = require('express');
const router1 =express.Router();
const indicator = require('../controllers/indicators.controller');

router1.get('/', indicator.getIndicators);
router1.post('/', indicator.createIndicator);






module.exports=router1;
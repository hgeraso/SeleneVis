const express = require('express');
const router1 =express.Router();
const indicator = require('../controllers/indicators.controller');

router1.get('/', indicator.getIndicators);
router1.post('/', indicator.createIndicator);
router1.post('/course', indicator.getIndicatorsByCourse)


module.exports=router1;
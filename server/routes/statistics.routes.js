const express = require('express');
const router =express.Router();
const statistic = require('../controllers/statistics.controller')

router.get('/', statistic.getStatistics);




module.exports=router;
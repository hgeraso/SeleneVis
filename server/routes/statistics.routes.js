const express = require('express');
const router =express.Router();
const statistic = require('../controllers/statistics.controller')

router.get('/', statistic.getStatistics);
router.get('/time', statistic.getTime);




module.exports=router;
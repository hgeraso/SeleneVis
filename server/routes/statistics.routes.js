const express = require('express');
const router =express.Router();
const statistic = require('../controllers/statistics.controller')
const stadisticByControl = require('../app/GetStadisticByControl')

router.get('/', statistic.getStatistics);
router.get('/time', statistic.getTimeVideo);
router.post( '/', statistic.getStatistics );
router.post( '/stadistic-day', stadisticByControl.getStadisticsDay );
router.post( '/stadistic-session', stadisticByControl.getStadisticSession );


module.exports=router;
const express = require('express');
const router =express.Router();
const courseStadistics = require('../controllers/course-stadistics.controller');

router.post('/', courseStadistics.getStadisticsByCourse)


module.exports = router;
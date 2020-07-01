const express = require('express');
const router =express.Router();
const grafos = require('../controllers/grafos.controller');

router.post('/', grafos.getGrafosStudentByDay);
router.post('/sessions', grafos.getGrafosStudentBySession);

module.exports = router;
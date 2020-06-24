const express = require('express');
const router =express.Router();
const grafos = require('../controllers/grafos.controller');

router.post('/', grafos.getdataStudent);

module.exports = router;
const express = require('express');
const router =express.Router();
const docente = require('../controllers/docente.controller');
const loginCTRL = require('../controllers/loginController');

router.post('/', loginCTRL.login)

module.exports=router;

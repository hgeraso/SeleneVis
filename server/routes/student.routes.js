const express = require('express');
const studenController = require('../controllers/student.controller');
const router = express.Router();

router.get( '/', studenController.test );
router.post( '/', studenController.save );

module.exports = router;
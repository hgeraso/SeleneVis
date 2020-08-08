const express = require('express');
const router =express.Router();
const docente = require('../controllers/docente.controller')
const mdAuth = require('../middlewares/tokenverification');

router.post('/' ,docente.createDocente);
// router.get('/', mdAuth.tokenVerify, docente.getDocentes);
router.get('/', docente.getDocentes);
router.get('/:id', docente.getDocente);
router.put('/:id', docente.editDocente);
router.delete('/:id',docente.deleteDocente);



module.exports=router;
const express = require('express');
const router =express.Router();
const docente = require('../controllers/docente.controller')

router.get('/', docente.getDocentes);
router.post('/', docente.createDocente);
router.get('/:id', docente.getDocente);
router.put('/:id', docente.editDocente);
router.delete('/:id',docente.deleteDocente);



module.exports=router;
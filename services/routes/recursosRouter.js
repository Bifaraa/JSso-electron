const express = require('express')
const recursoController = require('../controllers/recursosController')

const router = express.Router()

router.get('/Allprocesos', recursoController.getProcesos)
router.get('/Memoria', recursoController.getMemoria)
router.get('/Swap', recursoController.getSwap)
router.get('/Disco', recursoController.getDisco)

module.exports = router

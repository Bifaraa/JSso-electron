const express = require('express')
const txtController = require('../controllers/txtControler')

const txtRouter = express.Router()

txtRouter.get('/:username', txtController.getAllByUsername)
txtRouter.post('/', txtController.create)
txtRouter.put('/:id', txtController.updateById)
txtRouter.delete('/:id', txtController.deleteById)

module.exports = txtRouter

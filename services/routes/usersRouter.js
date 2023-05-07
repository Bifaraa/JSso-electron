const express = require('express')
const usersControler = require('../controllers/userControler')

const router = express.Router()

router.get('/', usersControler.getAll)
router.post('/login', usersControler.login)
router.post('/', usersControler.create)

module.exports = router

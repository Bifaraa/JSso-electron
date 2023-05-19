const api = () => {
  const express = require('express')
  const bodyParser = require('body-parser')

  const api = express()
  api.use(bodyParser.urlencoded({ extended: true }))
  api.use(bodyParser.json())

  const usersRouter = require('./routes/usersRouter')
  const txtRouter = require('./routes/txtRoute')
  const procesosRouter = require('./routes/recursosRouter')

  const cors = require('cors')
  api.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
      credentials: true
    })
  )

  api.use('/users', usersRouter)
  api.use('/txt', txtRouter)
  api.use('/procesos', procesosRouter)

  api.listen(4000, () => {
    console.log('API escuchando en el puerto 4000 full')
  })
}
module.exports = api

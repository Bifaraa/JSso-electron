const userModel = require('../models/userModel')

module.exports = {
  getAll: function (req, res) {
    userModel.getAll((err, rows) => {
      if (err) {
        console.error(err.message)
        res
          .status(500)
          .send('Error al obtener todo los usuarios de la base de datos')
      } else {
        res.send(rows)
      }
    })
  },
  create: function (req, res) {
    userModel.create(req.body, (err, rows) => {
      if (err) {
        console.error(err.message)
        res.status(409).send('Error al crear usuario en la base de datos')
      } else {
        res.send(rows)
      }
    })
  },
  login: function (req, res) {
    const { username, password } = req.body
    console.log('recibiendo la peticion con username pass', username, password)
    if (!username || !password) {
      res.status(400).send('Faltan datos en el body')
    }
    userModel.findUserByUsernameAndPassword(username, password, (err, user) => {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al buscar usuario en la base de datos')
      } else if (!user) {
        res.status(401).send('Usuario o contraseña incorrectos')
      } else {
        res.send(`Bienvenido ${user.username}!`)
      }
    })
  }
}

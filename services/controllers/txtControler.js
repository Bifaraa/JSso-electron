const txtModel = require('../models/txtModel')

module.exports = {
  getAllByUsername: function (req, res) {
    const username = req.params.username
    txtModel.getAllByUsername(username, (err, rows) => {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al obtener registros de la tabla txt')
      } else {
        res.send(rows)
      }
    })
  },
  create: function (req, res) {
    const txt = req.body
    txtModel.create(txt, function (err) {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al insertar registro en la tabla txt')
      } else {
        res.send(`Registro con id ${this.lastID} insertado en la tabla txt`)
      }
    })
  },
  updateById: function (req, res) {
    const id = req.params.id
    const txt = req.body
    txtModel.updateById(id, txt, function (err) {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al actualizar registro en la tabla txt')
      } else {
        if (this.changes === 0) {
          res.status(404).send('Registro no encontrado en la tabla txt')
        } else {
          res.send(`Registro con id ${id} actualizado en la tabla txt`)
        }
      }
    })
  },
  deleteById: function (req, res) {
    const id = req.params.id
    txtModel.deleteById(id, function (err) {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al borrar registro de la tabla txt')
      } else {
        if (this.changes === 0) {
          res.status(404).send('Registro no encontrado en la tabla txt')
        } else {
          res.send(`Registro con id ${id} eliminado de la tabla txt`)
        }
      }
    })
  }
}

const recursoModel = require('../models/recursosModel')

function getProcesos(req, res) {
  recursoModel.getProcesos((err, listaProcesos) => {
    if (err) {
      console.error(err)
      res.status(500).send('error al obtener los procesos')
    } else {
      res.send(listaProcesos)
    }
  })
}
function getMemoria(req, res) {
  recursoModel.getMemoria((err, listaMemoria) => {
    if (err) {
      console.error(err)
      res.status(500).send('error al obtener la memoria')
    } else {
      res.send(listaMemoria)
    }
  })
}
function getSwap(req, res) {
  recursoModel.getSwap((err, listaSwap) => {
    if (err) {
      console.error(err)
      res.status(500).send('error al obtener la swap')
    } else {
      res.send(listaSwap)
    }
  })
}

function getDisco(req, res) {
  recursoModel.getDisco((err, listaDisco) => {
    if (err) {
      console.error(err)
      res.status(500).send('error al obtener el disco')
    } else {
      res.send(listaDisco)
    }
  })
}

module.exports = { getProcesos, getMemoria, getSwap, getDisco }

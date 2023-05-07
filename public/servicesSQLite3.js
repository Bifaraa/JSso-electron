const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'mydb.sqlite') // ruta de la base de datos
const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('Conexión exitosa a la base de datos SQLite.')
    }
  }
)

// crearTablas, crea las tablas por defecto en la base de datos igual que los usuarios
function crearTablas() {
  db.run(
    `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT
    )`,
    (err) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log('Tabla "users" creada exitosamente.')
      }
    }
  )

  db.run(
    `CREATE TABLE txt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      username TEXT,
      FOREIGN KEY (username) REFERENCES users(username)
    )`,
    (err) => {
      if (err) {
        console.error(err.message)
      } else {
        console.log('Tabla "txt" creada exitosamente.')
      }
    }
  )
  crearUsuariosPorDefecto()
}

function crearUsuariosPorDefecto() {
  db.get('SELECT COUNT(*) AS count FROM users', (err, row) => {
    if (err) {
      console.error(err.message)
    } else if (row.count === 0) {
      db.run(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ['root', 'root'],
        (err) => {
          if (err) {
            console.error(err.message)
          } else {
            console.log('Usuario "root" creado exitosamente.')
          }
        }
      )
    }
  })
}

module.exports = {
  crearTablas,
  db
}

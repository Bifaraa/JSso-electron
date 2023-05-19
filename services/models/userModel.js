const { db } = require('../../public/servicesSQLite3')

module.exports = {
  findUserByUsernameAndPassword: function (username, password, callback) {
    console.log('username', username)
    console.log('password', password)
    db.get(
      'SELECT id, username, password FROM users WHERE username = ? AND password = ?',
      [username, password],
      callback
    )
  },
  create: function (user, callback) {
    db.get(
      'SELECT id FROM users WHERE username = ?',
      [user.username],
      function (err, row) {
        if (err) {
          callback(err)
        } else if (row) {
          // Si se encuentra una fila con el mismo nombre de usuario, significa que ya existe
          callback(new Error('El nombre de usuario ya existe'))
        } else {
          // Si no se encuentra ninguna fila, se inserta el nuevo usuario
          db.run(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [user.username, user.password],
            callback
          )
        }
      }
    )
  },
  getAll: function (callback) {
    db.all('SELECT * FROM users', callback)
  }
}

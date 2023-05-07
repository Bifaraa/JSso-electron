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
    db.run(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [user.username, user.password],
      callback
    )
  },
  getAll: function (callback) {
    db.all('SELECT * FROM users', callback)
  }
}

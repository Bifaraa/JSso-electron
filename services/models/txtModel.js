const { db } = require('../../public/servicesSQLite3')

module.exports = {
  getAllByUsername: function (username, callback) {
    db.all('SELECT * FROM txt WHERE username = ?', [username], callback)
  },
  create: function (txt, callback) {
    db.run(
      'INSERT INTO txt (text, username) VALUES (?, ?)',
      [txt.text, txt.username],
      callback
    )
  },
  updateById: function (id, txt, callback) {
    db.run('UPDATE txt SET text = ? WHERE id = ?', [txt.text, id], callback)
  },
  deleteById: function (id, callback) {
    db.run('DELETE FROM txt WHERE id = ?', [id], callback)
  }
}

const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
const express = require('express')
const bodyParser = require('body-parser')

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

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: true,
      // Agrega la directiva "script-src 'self'"
      contentSecurityPolicy: "default-src 'self'; img-src 'self';"
    }
  })

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' })
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const api = express()
api.use(bodyParser.urlencoded({ extended: true }))
api.use(bodyParser.json())
const cors = require('cors')

api.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  })
)

api.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send('Error al obtener usuarios')
    } else {
      res.send(rows)
    }
  })
})

api.get('/txt/:username', (req, res) => {
  const username = req.params.username
  db.all('SELECT * FROM txt WHERE username = ?', [username], (err, rows) => {
    if (err) {
      console.error(err.message)
      res.status(500).send('Error al obtener registros de la tabla txt')
    } else {
      res.send(rows)
    }
  })
})

api.post('/txt', (req, res) => {
  console.log('esta es la respuesta', req.body)
  const { text, username } = req.body
  db.run(
    'INSERT INTO txt (text, username) VALUES (?, ?)',
    [text, username],
    function (err) {
      if (err) {
        console.error(err.message)
        res.status(500).send('Error al insertar registro en la tabla txt')
      } else {
        res.send(`Registro con id ${this.lastID} insertado en la tabla txt`)
      }
    }
  )
})

api.put('/txt/:id', (req, res) => {
  const id = req.params.id
  const newText = req.body.text

  db.run('UPDATE txt SET text = ? WHERE id = ?', [newText, id], function (err) {
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
})

api.delete('/txt/:id', (req, res) => {
  const id = req.params.id

  db.run('DELETE FROM txt WHERE id = ?', [id], function (err) {
    if (err) {
      console.error(err.message)
      res.status(500).send('Error al borrar registro de la tabla txt')
    } else {
      if (this.changes === 0) {
        res.status(404).send('Registro no encontrado en la tabla txt')
      } else {
        res.send(`Registro con id ${id} borrado de la tabla txt`)
      }
    }
  })
})

api.listen(4000, () => {
  console.log('API escuchando en el puerto 4000 full')
})

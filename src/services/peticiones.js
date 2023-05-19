import axios from 'axios'

export async function getAllUsers() {
  try {
    const response = await axios.get(
      'http://localhost:4000/users',
      { withCredentials: true },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getUserByUsernameAndPassword({ name, pass }) {
  try {
    const response = await axios.post(
      'http://localhost:4000/users/login',
      {
        username: name,
        password: pass
      },
      { withCredentials: true },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getAllNotes(usuario) {
  try {
    const response = await axios.get(`http://localhost:4000/txt/${usuario}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function putNote(id, notaUsuario) {
  try {
    const response = axios.put(`http://localhost:4000/txt/${id}`, {
      text: notaUsuario // Nuevo texto para el registro
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function createNote(notaUsuario, name) {
  try {
    const response = axios.post(
      'http://localhost:4000/txt',
      { username: name, text: notaUsuario },
      { withCredentials: true },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function createUser(user, pass) {
  try {
    const response = await axios.post(
      'http://localhost:4000/users',
      { username: user, password: pass },
      { withCredentials: true },
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 409) {
      return 'El usuario ya existe'
    } else {
      throw error
    }
  }
}

export async function deleteNote(id) {
  try {
    const response = axios.delete(`http://localhost:4000/txt/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export async function getProcesos() {
  try {
    const response = await axios.get(
      'http://localhost:4000/procesos/Allprocesos'
    )
    console.log(response.data)
    const listProcesos = response.data.map((item) => {
      return item.split(' ')
    })
    return listProcesos
  } catch (error) {
    console.error(error)
  }
}

export async function getMemoria() {
  try {
    const response = await axios.get('http://localhost:4000/procesos/Memoria')
    console.log(response.data)
    return response.data.split(' ')
  } catch (error) {
    console.error(error)
  }
}

export async function getSwap() {
  try {
    const response = await axios.get('http://localhost:4000/procesos/Swap')
    console.log(response.data)
    return response.data.split('i')
  } catch (error) {
    console.error(error)
  }
}

export async function getDisco() {
  try {
    const response = await axios.get('http://localhost:4000/procesos/Disco')
    console.log(response.data)
    return response.data.split(' ')
  } catch (error) {
    console.error(error)
  }
}

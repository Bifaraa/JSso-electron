import axios from 'axios'

export async function getAllUsers() {
  try {
    const response = await axios.get(
      'http://localhost:4000/users',
      { withCredentials: true },
      { headers: { 'Content-Type': 'application/json' } }
    )
    console.log(response)
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

export async function createNote(notaUsuario) {
  try {
    const response = axios.post(
      'http://localhost:4000/txt',
      { username: 'root', text: notaUsuario },
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
    console.error(error)
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

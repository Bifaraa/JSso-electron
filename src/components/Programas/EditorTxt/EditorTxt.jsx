/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Texto from './Texto'

export default function EditorTxt({ visible, exit }) {
  /* TODO partir en varios componentes (componentisar) */
  const [listNotas, setListNotas] = useState([])
  const [notaNueva, setNotaNueva] = useState(false)
  const [cargarNota, setCargarNota] = useState(false)
  const [notaUsuario, setNotaUsuario] = useState('')
  const [actualizar, setActualizar] = useState(false)
  const [id, setID] = useState(0)
  const [listBorrar, setListBorrar] = useState(false)

  useEffect(() => {
    traerNotas()
    console.log('editor')
  }, [])

  const traerNotas = async () => {
    try {
      const response = await axios.get('http://localhost:4000/txt/root', {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setListNotas(response.data)
      console.log(listNotas)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClic = () => {
    exit(false)
  }

  const handleSave = async () => {
    if (notaUsuario === '' || notaUsuario === ' ') return
    if (actualizar) {
      axios
        .put(`http://localhost:4000/txt/${id}`, {
          text: notaUsuario // Nuevo texto para el registro
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      return
    }
    axios
      .post(
        'http://localhost:4000/txt',
        { username: 'root', text: notaUsuario },
        { withCredentials: true },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const newNota = () => {
    setNotaNueva(!notaNueva)
    setCargarNota(false)
    setNotaUsuario('')
    setActualizar(false)
    setID('')
  }

  const loadingNota = () => {
    setCargarNota(!cargarNota)
    setNotaNueva(false)
  }

  const loadingNotaDelete = () => {
    setListBorrar(!listBorrar)
    setNotaNueva(false)
  }

  const verNota = (txt, id) => {
    setCargarNota(!cargarNota)
    setActualizar(true)
    setID(id)
    setNotaUsuario(txt)

    console.log('texto selecionado', txt, id)
  }

  const verNotaDelete = (txt, id) => {
    setListBorrar(!listBorrar)
    setID(id)
    console.log('texto selecionado para borrar', txt, id)
    handleDelete()
  }

  const handleDelete = async () => {
    axios
      .delete(`http://localhost:4000/txt/${id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return visible ? (
    <>
      <section className='bg-neutral-700/90 w-full h-full flex flex-col border font-IBM z-20'>
        <div className='flex flex-row justify-between p-3 bg-black/50'>
          <h2 className='text-3xl text-white ml-[40%]'>Editor de texto</h2>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-x-circle-fill text-orange-500 cursor-pointer'
            viewBox='0 0 16 16'
            onClick={handleClic}
          >
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
          </svg>
        </div>
        <div className='relative h-full px-10 py-5 flex flex-col gap-5'>
          <div className='w-[35%] flex justify-around text-slate-300'>
            <button
              onClick={loadingNota}
              className='relative group w-[40%] flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                fill='currentColor'
                className='bi bi-arrow-counterclockwise'
                viewBox='0 0 16 16'
              >
                <path d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z' />
                <path d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z' />
              </svg>
              <span className='absolute top-full left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Cargar Notas
              </span>
            </button>
            <button
              onClick={newNota}
              className='relative group w-[40%] flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                fill='currentColor'
                viewBox='0 0 16 16'
                className='bi bi-file-earmark-plus-fill'
              >
                <path d='M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z' />
              </svg>
              <span className='absolute top-full left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Crear una nueva nota
              </span>
            </button>
            <button
              onClick={handleSave}
              className='relative group w-[40%] flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                fill='currentColor'
                className='bi bi-save-fill'
                viewBox='0 0 16 16'
              >
                <path d='M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z' />
              </svg>
              <span className='absolute top-full left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Guardar Nota
              </span>
            </button>
            <button
              onClick={loadingNotaDelete}
              className='relative group w-[40%] flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='40'
                height='40'
                fill='currentColor'
                className='bi bi-x-square-fill'
                viewBox='0 0 16 16'
              >
                <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z' />
              </svg>
              <span className='absolute top-full left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Borrar nota
              </span>
            </button>
            {actualizar ? (
              <span className='w-[100%]'>Actualizando nota</span>
            ) : (
              <span className='w-[100%]'>Creando nueva nota</span>
            )}
          </div>
          <Texto texto={notaUsuario} setNota={setNotaUsuario} />
          {cargarNota && (
            <ul className='absolute top-[15%] left-[5%] bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto text-white rounded-md p-5'>
              {listNotas.map((nota) => (
                <li key={nota.id} onClick={() => verNota(nota.text, nota.id)}>
                  {nota.text.length > 20 ? nota.text.slice(0, 20) : nota.text}
                </li>
              ))}
            </ul>
          )}
          {listBorrar && (
            <ul className='absolute top-[15%] left-[20%] bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto text-white rounded-md p-5'>
              {listNotas.map((nota) => (
                <li
                  key={nota.id}
                  onClick={() => verNotaDelete(nota.text, nota.id)}
                >
                  {nota.text.length > 20 ? nota.text.slice(0, 20) : nota.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  ) : (
    <>{console.log('Editor no visible')}</>
  )
}

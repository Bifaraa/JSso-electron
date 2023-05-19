/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import Texto from './Texto'
import {
  createNote,
  deleteNote,
  getAllNotes,
  putNote
} from '../../../services/peticiones'
import {
  IconsExit,
  IconsCargarDoc,
  IconsNuevaNota,
  IconsGuardarNota,
  IconsEliminarNota
} from '../../Icons'
import { AppContext } from '../../../context/AppContext'

export default function EditorTxt() {
  /* TODO partir en varios componentes (componentisar) */
  const { editorTxtVisible, setEditorTxtVisible } = useContext(AppContext)
  const [listNotas, setListNotas] = useState([])
  const [notaNueva, setNotaNueva] = useState(false)
  const [cargarNota, setCargarNota] = useState(false)
  const [notaUsuario, setNotaUsuario] = useState('')
  const [actualizar, setActualizar] = useState(false)
  const [id, setID] = useState(0)
  const [listBorrar, setListBorrar] = useState(false)
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    if (userData) {
      console.log(userData)
      getAllNotes(userData.username).then((data) => setListNotas(data))
    }
  }, [])

  const handleSave = async () => {
    if (notaUsuario === '' || notaUsuario === ' ' || notaUsuario.length > 254) {
      console.log('no entre')
      return
    }
    if (actualizar) {
      putNote(id, notaUsuario).then((data) => console.log(data))
      return
    }
    if (notaNueva) {
      createNote(notaUsuario, userData.username).then((data) =>
        console.log(data)
      )
      return
    }
    console.log('no hice nada')
  }

  const handleClic = () => {
    setEditorTxtVisible(false)
  }

  const newNota = () => {
    setNotaNueva(true)
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
  }

  const verNotaDelete = (txt, id) => {
    setListBorrar(!listBorrar)
    setID(id)
    handleDelete()
  }

  const handleDelete = async () => {
    deleteNote(id)
  }

  return editorTxtVisible ? (
    <>
      <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border font-IBM z-20'>
        <div className='flex flex-row justify-between p-3 bg-black/50'>
          <h2 className='text-3xl text-white ml-[40%]'>Editor de texto</h2>
          <IconsExit handleExit={handleClic} />
        </div>
        <div className='relative h-full px-10 py-5 flex flex-col gap-14'>
          <div className='w-[50%] flex gap-10 text-slate-300'>
            <button
              onClick={loadingNota}
              className='relative group flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <IconsCargarDoc />
              <span className='absolute top-[50px] left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Cargar Notas
              </span>
            </button>
            <button
              onClick={newNota}
              className='relative group flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <IconsNuevaNota />
              <span className='absolute w-[100px] top-[50px] left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Crear una nueva nota
              </span>
            </button>
            <button
              onClick={handleSave}
              className='relative group flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <IconsGuardarNota />
              <span className='absolute top-[50px] left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
                Guardar Nota
              </span>
            </button>
            <button
              onClick={loadingNotaDelete}
              className='relative group flex justify-center focus:outline-slate-100/50 focus:outline-1'
            >
              <IconsEliminarNota />
              <span className='absolute top-[50px] left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
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
            <ul className='absolute top-[15%] left-[3%] bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto text-white rounded-md p-5'>
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
    <></>
  )
}

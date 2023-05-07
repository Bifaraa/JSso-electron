/* eslint-disable n/no-path-concat */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cabecera from './barras-cabeceras/Cabecera'
import { getAllUsers } from '../services/peticiones'

export default function Login() {
  /* TODO: hacer que si se mete la contraseña incorrecta
  muestre error, subrayando el recuadro de rojo y diga contraseña incorrecta y funicone el boton de power */
  const [listUsers, setListUsers] = useState([])

  /* Referencia para apuntar al valor de los inputs */
  const usuarioInput = useRef()
  const constraseñaInput = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers().then((res) => {
      setListUsers(res)
    })
  }, [])

  const handleLogin = () => {
    const user = usuarioInput.current.value
    const pass = constraseñaInput.current.value
    console.log(user, pass)
    console.log(listUsers)
    const usuarioEncontrado = listUsers.find(
      (obj) => obj.username === user && obj.password === pass
    )
    if (!usuarioEncontrado) {
      alert('usuario y contraseña malos')
      return
    }
    console.log(usuarioEncontrado)
    if (
      usuarioEncontrado.username === user &&
      usuarioEncontrado.password === pass
    ) {
      const userData = {
        username: usuarioEncontrado.username,
        id: usuarioEncontrado.id
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      navigate('/escritorio')
    }
    /*  getUserByUsernameAndPassword({ user, pass }).then((res) => {
      console.log(res)
      if (res.length > 0) {
        const userData = {
          username: res[0].username,
          id: res[0].id
        }
        localStorage.setItem('userData', JSON.stringify(userData))
        navigate('/escritorio')
      } else {
        alert('usuario y contraseña malos')
      }
    }) */
  }

  return (
    <main className='w-screen h-screen bg-gradient-to-r bg-neutral-800 '>
      <Cabecera relojVisible={true} powerVisible={true} />
      <section className='flex flex-col justify-center items-center'>
        <div className='flex flex-col w-[8em] p-5 items-center mb-6 '>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='100'
            height='100'
            fill='currentColor'
            className='bi bi-person-circle shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] rounded-full text-slate-400'
            viewBox='0 0 16 16'
          >
            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
            <path d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z' />
          </svg>
        </div>
        <form className='flex flex-col gap-4  '>
          <div className='bg-neutral-900 p-12 rounded-lg shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)]'>
            <div className='flex w-full justify-around mb-12'>
              <label className='w-1/4 text-white text-lg' htmlFor='usuario'>
                Usuario
              </label>
              <input
                ref={usuarioInput}
                className='w-1/2 rounded-lg'
                id='text'
                type='email'
                name='usuario'
                placeholder='Usuario'
                required={true}
              />
            </div>

            <div className='mb-2 flex w-full justify-around'>
              <label className='w-1/4 text-white text-lg' htmlFor='contraseña'>
                Contraseña
              </label>
              <input
                ref={constraseñaInput}
                className='w-1/2 rounded-lg'
                id='password1'
                type='password'
                required={true}
                name='contraseña'
                placeholder='*********'
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className='bg-lime-500 w-[16em] h-[4em] mt-4 self-center rounded-lg shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)]'
            type='submit'
          >
            <span className='text-xl'>Ingresar</span>
          </button>
        </form>
      </section>
    </main>
  )
}

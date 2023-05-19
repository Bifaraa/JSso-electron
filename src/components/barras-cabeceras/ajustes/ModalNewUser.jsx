import React, { useState } from 'react'
import { createUser } from '../../../services/peticiones'
import { IconsExit, IconsNewUser } from '../../Icons'

export default function ModalNewUser() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Aquí puedes agregar la lógica para crear un nuevo usuario con los datos del formulario
    handleNewUser()
    setUsername('')
    setPassword('')
    setIsOpen(false)
  }
  const handleNewUser = () => {
    createUser(username, password).then((res) => {
      if (res === 'El usuario ya existe') {
        alert(res)
      }
      console.log(res)
    })
  }

  return (
    <>
      <button onClick={toggleModal} className='font-mono'>
        <IconsNewUser />
        <span className='absolute top-[70px] left-[50%] transform -translate-x-1/2 bg-neutral-900 text-white text-center py-1 px-2 text-sm rounded-md opacity-0 group-hover:opacity-100'>
          Agregar nuevo usuario
        </span>
      </button>
      {isOpen && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-10 font-mono '>
          <div className='relative bg-neutral-700/90 rounded-lg p-16 flex flex-col gap-5 items-center'>
            <h2 className='text-lg font-medium mb-4'>Nuevo usuario</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <div className='mb-4'>
                <label htmlFor='username' className='block font-medium mb-2'>
                  Nombre de usuario
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={username}
                  onChange={handleUsernameChange}
                  className='w-full border border-gray-300 p-2 rounded text-black'
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='password' className='block font-medium mb-2'>
                  Contraseña
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='w-full border border-gray-300 p-2 rounded text-black'
                />
              </div>
              <div className='flex justify-center'>
                <button
                  type='submit'
                  className='border-2 border-sky-500 text-white px-4 py-2 rounded hover:bg-sky-500'
                >
                  Crear usuario
                </button>
              </div>
            </form>
            <div className='absolute top-4 right-4'>
              <IconsExit handleExit={toggleModal} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

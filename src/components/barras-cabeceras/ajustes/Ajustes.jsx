/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../context/AppContext'
import { IconsExit, IconsNewUser } from '../../Icons'
import { getAllUsers } from '../../../services/peticiones'
import ModalNewUser from './ModalNewUser'

export default function Ajustes() {
  const { ajustesVisible, setAjustesVisible } = useContext(AppContext)
  const [listUsers, setListUsers] = useState([])
  const [usuarios, setUsuarios] = useState(true)
  const [themas, setThemas] = useState(false)
  const [usuario, setUsuario] = useState()

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      console.log(userData)
      setUsuario(userData.username)
    }
  }, [])

  const handleClic = () => {
    setAjustesVisible(false)
  }

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res)
        setListUsers(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [ajustesVisible])

  const irUsuarios = () => {
    setUsuarios(true)
    setThemas(false)
  }

  const irThemas = () => {
    setUsuarios(false)
    setThemas(true)
  }

  const styleThemas = () => {
    return themas
      ? 'hover:cursor-pointer border-b-2 border-sky-500'
      : 'hover:cursor-pointer'
  }

  const styleUsuarios = () => {
    return usuarios
      ? 'hover:cursor-pointer border-b-2 border-sky-500'
      : 'hover:cursor-pointer'
  }

  return ajustesVisible ? (
    <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border font-mono text-white'>
      <div className='flex flex-row justify-between p-3 bg-black/50'>
        <h2 className='text-3xl  ml-[40%]'>Consola</h2>
        <IconsExit handleExit={handleClic} />
      </div>
      <div className='flex h-full mt-10 justify-around'>
        <nav className='self-center font-IBM  text-2xl text-white ml-12  border-2 border-sky-500 rounded-lg p-8 mb-28 shadow-lg shadow-neutral-900'>
          <div className={styleUsuarios()}>
            <a onClick={irUsuarios}>Usuarios</a>
          </div>
          <hr className='mt-3 mb-3' />
          <div className={styleThemas()}>
            <a onClick={irThemas}>Themas</a>
          </div>
        </nav>
        <div className='w-[70%] h-[75%] p-6 border-2 border-sky-500 rounded-lg shadow-lg shadow-neutral-900 bg-black/50 flex items-center justify-evenly'>
          <table className='w-1/2'>
            <thead className='w-full'>
              <tr className='w-[20em] flex gap-10 justify-center mb-5'>
                <th className='w-full'>Nombre</th>
                <th className='w-full'>Id</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {listUsers.map((user) => (
                <tr
                  key={user.id}
                  className='w-[20em] flex gap-10 justify-center'
                >
                  <th className='w-full font-medium'>{user.username}</th>
                  <th className='w-full font-medium'>{user.id}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='cursor-pointer relative group flex justify-center'>
            {usuario === 'root' ? <ModalNewUser /> : <IconsNewUser />}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  )
}

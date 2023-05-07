/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */

import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { IconsExit } from '../Icons'
import Memoria from './componentes-Administrador/Memoria'
import Procesos from './componentes-Administrador/Procesos'

export default function Administrador() {
  /* TODO: es el encargado de hacer las peticiones y pasar los parametros
  a los componentes, como a memoria o procesos (cantidad de ram disponible etc) */
  const { administrador, setAdministrador } = useContext(AppContext)
  const [procesos, setProcesos] = useState(false)
  const [memoria, setMemoria] = useState(true)

  const irMemoria = () => {
    setProcesos(false)
    setMemoria(true)
  }

  const irProcesos = () => {
    setMemoria(false)
    setProcesos(true)
  }

  const handleClic = () => {
    setAdministrador(false)
  }

  const styleProcesos = () => {
    return procesos
      ? 'hover:cursor-pointer border-b-2 border-sky-500'
      : 'hover:cursor-pointer'
  }

  const styleMemoria = () => {
    return memoria
      ? 'hover:cursor-pointer border-b-2 border-sky-500'
      : 'hover:cursor-pointer'
  }

  return administrador ? (
    <>
      <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border'>
        <section className='w-full'>
          <div className='flex flex-row-reverse p-3 text-red-800 bg-black/50'>
            <IconsExit handleExit={handleClic} />
          </div>
        </section>
        <div className='flex h-full mt-10 justify-around'>
          <nav className='self-center font-IBM  text-2xl text-white ml-12  border-2 border-sky-500 rounded-lg p-8 mb-28 shadow-lg shadow-neutral-900'>
            <div className={styleMemoria()}>
              <a onClick={irMemoria}>Memoria</a>
            </div>
            <hr className='mt-3 mb-3' />
            <div className={styleProcesos()}>
              <a onClick={irProcesos}>Procesos</a>
            </div>
          </nav>
          <div className='w-[70%] h-[75%] p-6 border-2 border-sky-500 rounded-lg shadow-lg shadow-neutral-900 bg-black/50'>
            {memoria && (
              <Memoria
                memoriaTotal={100}
                memoriaUsada={200}
                discoTotal={500}
                discoUsado={200}
                swapTotal={20}
                swapUsada={2}
              />
            )}
            {procesos && <Procesos />}
          </div>
        </div>
      </section>
    </>
  ) : (
    <></>
  )
}

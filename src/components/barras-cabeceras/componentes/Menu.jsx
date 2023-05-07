/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import { Transition } from 'react-transition-group'

import { AppContext } from '../../../context/AppContext.jsx'

const duration = 200
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

export default function Menu({ visible }) {
  /* TODO que cuando se de click fuera del cuadro se cierre las opciones de  menu */

  const apps = useContext(AppContext)
  const [estaAbierto, setEstaAbierto] = useState(false)
  const opciones = ['Aplicaciones', 'Administrador', 'Ajustes']

  const handleMenu = () => {
    setEstaAbierto(!estaAbierto)
  }

  const handleClicApp = (opcion) => {
    if (opcion.target.innerText === 'Administrador') {
      console.log('opcion elejida admi')
      apps.setAdministrador(true)
    }
    if (opcion.target.innerText === 'Ajustes') {
      console.log('opcion elejida ajustes', opcion.target.innerText)
      apps.setAjustesVisible(true)
    }
  }

  return visible ? (
    <div
      onClick={handleMenu}
      className='p-2 relative hover:ring-2 hover:rounded-md hover:ring-neutral-700 hover:bg-neutral-800/30'
    >
      <span className='font-IBM text-xl hover:cursor-pointer tracking-wider text-slate-400'>
        Menú
      </span>
      <Transition in={estaAbierto} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {estaAbierto && (
              <ul className='font-IBM flex flex-col gap-5 p-6 pl-10 rounded-lg absolute top-[5em] z-10 w-60 bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto'>
                {opciones.map((option, index) => (
                  <li
                    key={index}
                    className='text-white hover:ring-2 hover:cursor-pointer rounded-md p-2'
                    onClick={handleClicApp}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Transition>
    </div>
  ) : (
    <></>
  )
}

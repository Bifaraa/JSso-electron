/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */

import React, { useRef, useState } from 'react'
import { Transition } from 'react-transition-group'

const duration = 500

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

export default function Menu({ visible, aplicacion }) {
  /* TODO que cuando se de click fuera del cuadro se cierre las opciones de  menu */

  const [estaAbierto, setEstaAbierto] = useState(false)
  const opciones = ['Aplicaciones', 'Administrador', 'Ajustes']

  const nodeRef = useRef(null)

  const handleClic = () => {
    setEstaAbierto(!estaAbierto)
  }

  const handleClicApp = (opcion) => {
    if (opcion.target.innerText === 'Administrador') {
      console.log('opcion elejida admi')
      aplicacion(true)
    }
  }

  return visible ? (
    <div
      onClick={handleClic}
      className='p-2 relative hover:ring-2 hover:rounded-md hover:ring-neutral-700 hover:bg-neutral-800/30 transition ease-in-out delay-200'
    >
      <span className='font-IBM text-xl hover:cursor-pointer tracking-wider text-slate-400'>
        Menú
      </span>

      <Transition
        nodeRef={nodeRef}
        in={estaAbierto}
        timeout={duration}
        unmountOnExit
        onEntered={() => {}}
        onExit={() => setEstaAbierto(false)}
      >
        {(state) => (
          <div>
            {estaAbierto && (
              /* TODO agregar transion */
              <ul
                ref={nodeRef}
                className='font-IBM flex flex-col gap-5 p-6 pl-10 rounded-lg absolute top-[5em] z-10 w-60 bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
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

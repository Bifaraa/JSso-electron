/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Transition } from 'react-transition-group'

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

export default function Power({ visible }) {
  const [estaAbierto, setEstaAbierto] = useState(false)
  const navigate = useNavigate()

  const handleVisible = () => {
    setEstaAbierto(!estaAbierto)
  }
  const handleCerrarSesion = () => {
    localStorage.clear()
    navigate('/login')
  }
  return visible ? (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='30'
        height='30'
        fill='white'
        className='bi bi-power'
        viewBox='0 0 16 16'
        onClick={handleVisible}
      >
        <path d='M7.5 1v7h1V1h-1z' />
        <path d='M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z' />
      </svg>
      <Transition in={estaAbierto} timeout={duration}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}
          >
            {estaAbierto && (
              <ul className='font-IBM flex flex-col gap-5 p-4 pl-7 rounded-lg absolute top-[6em] right-[1em] z-10 w-60 bg-neutral-800/90 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)] h-auto'>
                <li
                  className='text-white hover:ring-2 hover:cursor-pointer rounded-md p-2 text-lg'
                  onClick={handleCerrarSesion}
                >
                  Cerrar Sesión
                </li>
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

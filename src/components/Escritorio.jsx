import React, { useContext } from 'react'
import { Transition } from 'react-transition-group'
import { AppContext } from '../context/AppContext'
import BarraApp from './barras-cabeceras/BarraApp'
import Cabecera from './barras-cabeceras/Cabecera'
import Administrador from './Programas/Administrador'
import backgroundImage from '../assets/img/lion-2305938_1920.jpg'
import EditorTxt from './Programas/EditorTxt/EditorTxt'
import Consola from './CLI/Consola'
import Ajustes from './barras-cabeceras/ajustes/Ajustes'

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

export default function Escritorio() {
  const app = useContext(AppContext)

  return (
    <main>
      <section className='bg-neutral-900 w-screen h-[12vh]'>
        <Cabecera relojVisible={true} powerVisible={true} menuVisible={true} />
      </section>
      <section
        className='w-screen h-[88vh] relative'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='overflow-hidden w-full'>
          <Transition in={app.administrador} timeout={duration}>
            {(state) => (
              <div
                className='w-full'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <Administrador />
              </div>
            )}
          </Transition>
          <Transition in={app.ajustesVisible} timeout={duration}>
            {(state) => (
              <div
                className='w-full'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <Ajustes />
              </div>
            )}
          </Transition>
          <Transition in={app.editorTxtVisible} timeout={duration}>
            {(state) => (
              <div
                className='w-full'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <EditorTxt />
              </div>
            )}
          </Transition>
          <Transition in={app.consolaVisible} timeout={duration}>
            {(state) => (
              <div
                className='w-full'
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
              >
                <Consola />
              </div>
            )}
          </Transition>
        </div>

        <div className='bg-slate-600/80 rounded-lg absolute bottom-0 left-1/2 translate-y-[-20%] translate-x-[-50%] p-5 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)]'>
          <BarraApp />
        </div>
      </section>
    </main>
  )
}

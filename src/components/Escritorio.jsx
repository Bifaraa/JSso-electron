import React, { useRef, useState } from 'react'
import BarraApp from './barras-cabeceras/BarraApp'
import Cabecera from './barras-cabeceras/Cabecera'
import Administrador from './Programas/Administrador'
import { Transition } from 'react-transition-group'
import backgroundImage from '../assets/img/lion-2305938_1920.jpg'
import EditorTxt from './Programas/EditorTxt/EditorTxt'

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

export default function Escritorio() {
  const [amdVisible, setAdmiVisible] = useState(false)
  const [editorTxtVisible, setEditorTextVisible] = useState(false)
  const nodeRef = useRef(null)

  return (
    <main>
      <section className='bg-neutral-900 w-screen h-[12vh]'>
        <Cabecera
          relojVisible={true}
          powerVisible={true}
          menuVisible={true}
          aplicacion={setAdmiVisible}
        />
      </section>
      <section
        className='w-screen h-[88vh] relative'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Transition
          nodeRef={nodeRef}
          in={amdVisible}
          timeout={duration}
          unmountOnExit
        >
          {(state) => (
            <div
              ref={nodeRef}
              className='w-screen h-full'
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <Administrador visible={amdVisible} exit={setAdmiVisible} />
            </div>
          )}
        </Transition>
        <EditorTxt visible={editorTxtVisible} exit={setEditorTextVisible} />
        <div className='bg-slate-600/80 rounded-lg absolute bottom-0 left-1/2 translate-y-[-20%] translate-x-[-50%] p-5 shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)]'>
          <BarraApp editor={setEditorTextVisible} />
        </div>
      </section>
    </main>
  )
}

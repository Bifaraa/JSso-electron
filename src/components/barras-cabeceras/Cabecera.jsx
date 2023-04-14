/* eslint-disable react/prop-types */
import React from 'react'
import Menu from './componentes/Menu'
import Power from './componentes/Power'
import Reloj from './componentes/Reloj'

export default function Cabecera({
  relojVisible,
  powerVisible,
  menuVisible,
  administradorVisible,
  aplicacion
}) {
  const classNamePower = `flex w-1/3 justify-${
    menuVisible ? 'end space-x-36' : 'end'
  }`

  return (
    <section className='flex w-full justify-between pt-5 px-12'>
      <Reloj visible={relojVisible} />
      <div className={classNamePower}>
        <Menu visible={menuVisible} aplicacion={aplicacion} />
        <div className='hover:cursor-pointer rounded-full shadow-[-.9em_.5em_1em_-.4em_rgba(0,0,0,0.6)]'>
          <Power visible={powerVisible} />
        </div>
      </div>
    </section>
  )
}

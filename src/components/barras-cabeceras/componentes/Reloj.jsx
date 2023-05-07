/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

export default function Reloj({ visible }) {
  /* TODO organizar renderizado condicional */
  const [horaCompleta, setHoraCompleta] = useState(new Date())

  useEffect(() => {
    const intervaloTiempo = setInterval(() => {
      setHoraCompleta(new Date())
    }, 1000)
    return () => clearInterval(intervaloTiempo)
  }, [])

  const hora = horaCompleta.getHours()
  const minuto = horaCompleta.getMinutes()
  const segundo = horaCompleta.getSeconds()

  const año = horaCompleta.getFullYear()
  const mes = horaCompleta.getMonth()
  const dia = horaCompleta.getDate()

  return visible ? (
    <section className='flex p-2 text-slate-400 '>
      <div className=''>
        <span className='text-lg'>
          {hora}:{minuto}:{segundo}
        </span>
      </div>
      <div className='ml-5'>
        <span className='text-lg'>
          {año}-{mes}-{dia}
        </span>
      </div>
    </section>
  ) : (
    <></>
  )
}

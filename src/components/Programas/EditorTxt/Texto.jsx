/* eslint-disable react/prop-types */
import React from 'react'

export default function Texto({ texto, setNota }) {
  const haddlerText = (e) => {
    setNota(e.target.value)
  }

  return (
    <textarea
      onChange={haddlerText}
      className='w-full h-[70%] bg-white/0 border-0 text-white focus:border-0'
      placeholder='Haga clic para escribir'
      value={texto}
    ></textarea>
  )
}

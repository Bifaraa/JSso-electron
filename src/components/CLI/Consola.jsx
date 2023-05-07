/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */

import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { IconsExit } from '../Icons'
import TextConsola from './TextConsola'

export default function Consola() {
  const { consolaVisible, setConsolaVisible } = useContext(AppContext)
  const handleExit = () => {
    setConsolaVisible(false)
  }

  return consolaVisible ? (
    <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border font-mono'>
      <div className='flex flex-row justify-between p-3 bg-black/50'>
        <h2 className='text-3xl text-white ml-[40%]'>Consola</h2>
        <IconsExit handleExit={handleExit} />
      </div>
      <TextConsola exit={handleExit} />
    </section>
  ) : (
    <></>
  )
}

/* eslint-disable multiline-ternary */
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { IconsExit } from '../Icons'
export default function Calculadora() {
  const { calculadora, setCalculadora } = useContext(AppContext)

  const handleExit = () => {
    setCalculadora(false)
  }
  return calculadora ? (
    <>
      <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border font-mono'>
        <div className='flex flex-row justify-between p-3 bg-black/50'>
          <h2 className='text-3xl text-white ml-[40%]'>Calculadora</h2>
          <IconsExit handleExit={handleExit} />
        </div>
        <h2>Calculadora</h2>
      </section>
    </>
  ) : (
    <></>
  )
}

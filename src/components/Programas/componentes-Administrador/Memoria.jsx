/* eslint-disable react/prop-types */
import React from 'react'

export default function Memoria({
  memoriaTotal,
  memoriaUsada,
  discoTotal,
  discoUsado,
  swapTotal,
  swapUsada
}) {
  return (
    <>
      <div className='w-full h-1/2 flex flex-wrap justify-around font-IBM  text-xl text-white'>
        <h3 className='w-full text-center text-2xl mb-2'>Memoria</h3>
        <div className='flex flex-col mr-32 gap-5'>
          <div className='flex gap-8'>
            <h3 className='w-[120px]'>Memoria Total</h3>
            <span>{memoriaTotal} MB</span>
          </div>
          <div className='flex gap-8'>
            <h3 className='w-[120px]'>Memoria Disponible</h3>
            <span>{memoriaTotal - memoriaUsada} MB</span>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='flex gap-8'>
            <h3 className='w-[120px]'>SWAP Total</h3>
            <span>{swapTotal} MB</span>
          </div>
          <div>
            <div className='flex gap-8'>
              <h3 className='w-[120px]'>SWAP Disponible</h3>
              <span>{swapUsada} MB</span>
            </div>
          </div>
        </div>
      </div>
      <hr className='mt-5 mb-5' />
      <div className='w-full flex content-around flex-col font-IBM text-xl text-white'>
        <h3 className='mb-5 text-2xl w-full text-center'>Disco Duro</h3>
        <div className='flex justify-around gap-20'>
          <div className='flex'>
            <h3 className='w-[100px]'>Espacio Total</h3>
            <span>{discoTotal} MB</span>
          </div>
          <div className='flex '>
            <h3 className='w-[150px]'>Espacio Disponible</h3>
            <span>{discoTotal - discoUsado} MB</span>
          </div>
        </div>
      </div>
    </>
  )
}

/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React from 'react'

export default function EditorTxt({ visible, exit }) {
  const handleClic = () => {
    exit(false)
  }

  return visible ? (
    <>
      <section className='bg-neutral-700/90 w-full h-full flex flex-col border font-IBM z-20'>
        <div className='flex flex-row justify-between p-3 text-red-800 bg-black/50'>
          <h2 className='text-3xl text-white ml-[40%]'>Editor de texto</h2>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='30'
            height='30'
            fill='currentColor'
            className='bi bi-x-circle-fill text-orange-500 cursor-pointer'
            viewBox='0 0 16 16'
            onClick={handleClic}
          >
            <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z' />
          </svg>
        </div>
        <div className='h-full p-10'>
          <textarea
            className='w-full h-[90%] bg-white/0 border-0 text-white focus:border-0'
            placeholder='Haga clic para escribir'
          ></textarea>
        </div>
      </section>
    </>
  ) : (
    <>{console.log('Editor no visible')}</>
  )
}

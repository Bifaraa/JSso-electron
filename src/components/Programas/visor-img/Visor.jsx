/* eslint-disable multiline-ternary */
import React, { useContext, useState } from 'react'
import { IconsExit } from '../../Icons'
import { AppContext } from '../../../context/AppContext'
export default function Visor() {
  const { visorImgVisible, setVisorImgVisible } = useContext(AppContext)
  const [img, setImg] = useState(null)
  const handleExit = () => {
    setVisorImgVisible(false)
  }

  const handleImgUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImg(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleClear = () => {
    setImg(null)
  }

  return visorImgVisible ? (
    <>
      <section className='bg-neutral-700/90 w-full h-[88vh] flex flex-col border font-mono'>
        <div className='flex flex-row justify-between p-3 bg-black/50'>
          <h2 className='text-3xl text-white ml-[40%]'>Visor De Imagenes</h2>
          <IconsExit handleExit={handleExit} />
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row justify-between p-3'>
            <input type='file' onChange={handleImgUpload} />
            <button className='text-white' onClick={handleClear}>
              Limpiar pantalla
            </button>
          </div>
          <div className='w-full flex flex-col items-center'>
            <img className='object-cover h-3/4' src={img} alt='' />
          </div>
        </div>
      </section>
    </>
  ) : (
    <></>
  )
}

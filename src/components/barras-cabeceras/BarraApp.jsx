/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import {
  IconsConsola,
  IconsDocument,
  IconsReloj,
  IconsVisor,
  IconsCalculadora
} from '../Icons'

export default function BarraApp() {
  const apps = useContext(AppContext)

  const handleClicEditor = () => {
    apps.setEditorTxtVisible(true)
  }

  const handleClicConsola = () => {
    apps.setConsolaVisible(true)
  }

  const handleClicVisor = () => {
    apps.setVisorImgVisible(true)
  }

  const handleClicCalculadora = () => {
    apps.setCalculadora(true)
  }

  return (
    <section className='flex gap-10 text-white '>
      <div className='p-2 hover:scale-[1.3] hover:ring-2 rounded-md hover:cursor-pointer hover:ring-white transition ease-out delay-200 hover:shadow-2xl'>
        <IconsReloj />
      </div>
      <div className='p-2 hover:scale-[1.3] hover:ring-2 rounded-md hover:cursor-pointer hover:ring-white transition ease-out delay-200 hover:shadow-2xl'>
        <IconsCalculadora handleCalculadora={handleClicCalculadora} />
      </div>
      <div className='p-2 hover:scale-[1.3] hover:ring-2 rounded-md hover:cursor-pointer hover:ring-white transition ease-out delay-200 hover:shadow-2xl'>
        <IconsDocument handleDocument={handleClicEditor} />
      </div>
      <div className='p-2 hover:scale-[1.3] hover:ring-2 rounded-md hover:cursor-pointer hover:ring-white transition ease-out delay-200 hover:shadow-2xl'>
        <IconsConsola handleConsola={handleClicConsola} />
      </div>
      <div className='p-2 hover:scale-[1.3] hover:ring-2 rounded-md hover:cursor-pointer hover:ring-white transition ease-out delay-200 hover:shadow-2xl'>
        <IconsVisor handleClicVisor={handleClicVisor} />
      </div>
    </section>
  )
}

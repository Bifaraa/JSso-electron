import React, { useEffect, useState } from 'react'
import { getProcesos } from '../../../services/peticiones'

export default function Procesos() {
  const [listProcesos, setListProcesos] = useState([])

  useEffect(() => {
    getProcesos().then((res) => {
      creadorDeProcesos(res)
      console.log(listProcesos)
      console.log(listProcesos[0].memoria)
    })
  }, [])

  const creadorDeProcesos = (procesos) => {
    setListProcesos(
      procesos.map((proceso) => {
        return {
          id: proceso[0],
          memoria: proceso[1],
          nombre: proceso[2]
        }
      })
    )
  }

  return (
    <>
      <div className='flex flex-col text-white font-IBM'>
        <nav className=''>
          <ul className='flex text-2xl justify-around '>
            <li>Todo</li>
            <li>Programas en ejecución</li>
            <li>Servicios</li>
          </ul>
        </nav>
        <table className='flex flex-col '>
          <thead className=''>
            <tr className='flex justify-around space-y-10 items-baseline'>
              <th>Nombre</th>
              <th>ID</th>
              <th>% Memoria</th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto h-[30vh]'>
            {listProcesos.map((proceso) => (
              <tr
                key={proceso.id}
                className='flex justify-around space-y-10 items-baseline'
              >
                <td>{proceso.nombre}</td>
                <td>{proceso.id}</td>
                <td>{proceso.memoria} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

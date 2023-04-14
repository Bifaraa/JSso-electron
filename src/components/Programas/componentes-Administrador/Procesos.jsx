import React from 'react'

export default function Procesos() {
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
        <table className='flex flex-col'>
          <thead>
            <tr className='flex justify-around space-y-10 items-baseline'>
              <th>Nombre</th>
              <th>ID</th>
              <th>% Memoria</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody className=''>
            <tr className='flex justify-around space-y-10 items-baseline'>
              <td>Nombre1</td>
              <td>ID1</td>
              <td>50%</td>
              <td>Descripción1</td>
            </tr>
            <tr className='flex justify-around space-y-10 items-baseline'>
              <td>Nombre2</td>
              <td>ID2</td>
              <td>75%</td>
              <td>Descripción2</td>
            </tr>
            <tr className='flex justify-around space-y-10 items-baseline'>
              <td>Nombre3</td>
              <td>ID3</td>
              <td>30%</td>
              <td>Descripción3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

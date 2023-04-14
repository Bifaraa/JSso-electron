/* eslint-disable react/prop-types */
import React from 'react'

export default function Power({ visible }) {
  if (visible) {
    return (
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          fill='white'
          className='bi bi-power'
          viewBox='0 0 16 16'
        >
          <path d='M7.5 1v7h1V1h-1z' />
          <path d='M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z' />
        </svg>
      </div>
    )
  } else return <></>
}

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'
import { Progress } from 'flowbite-react'
import TypingEffect from './TypingEffect'

export default function Carga() {
  const string =
    'Booting Linux kernel...Loading initial ramdisk...Setting up system clock...Checking file system...Mounting root file system...Setting hostname...Configuring network interfaces...Starting system logger...Starting kernel logger...Initializing firewall...System is ready!'

  /* el estado del avance de la barra de carga */
  const [barCarga, setBarCarga] = useState(0)
  const navitage = useNavigate()
  /* Apenas se carga el componente comienza a settear el estado de la barra de carga (barCarga) tomando un número aleatorio entre 1 y 0 y va avanzando. Usa el setInverval para repetir el setBarcarga cada .500s cuando el porcentaje sea 100 se usa navigate para ir a login */

  useEffect(() => {
    const interval = setInterval(() => {
      setBarCarga((prevPorcentaje) => {
        if (prevPorcentaje === 100) {
          clearInterval(interval)
          navitage('/login')
          return 100
        } else {
          const numAleatorioIncremento = Math.floor(Math.random() * 10) + 1
          return Math.min(prevPorcentaje + numAleatorioIncremento, 100)
        }
      })
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className='w-screen h-screen relative flex flex-col justify-around items-center bg-neutral-800'>
      <div className='w-1/6 absolute top-4 left-4 text-lime-500'>
        <TypingEffect text={string} />
      </div>
      <Logo />
      <div className='w-1/2'>
        <Progress progress={barCarga} color='yellow' size='lg' />
      </div>
    </section>
  )
}

/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import TypingEffect from '../TypingEffect'
import * as operador from '../../services/consola'

export default function TextConsola({ exit }) {
  const [text, setText] = useState('')
  const [history, setHistory] = useState([])

  const handleInput = (event) => {
    setText(event.target.value)
  }

  const textHelp =
    'Comando de ayuda de comandos disponibles:\n sum = recibe dos argumentos y devuelve el resultado de la operacion entre estos \n res = recibe dos argumentos y devuelve el resultado de la operacion entre estos \n mult = recibe dos argumentos y devuelve el resultado de la operacion entre estos \n div = recibe dos argumentos y devuelve el resultado de la operacion entre estos'

  const comando = () => {
    if (text.length < 3) return 'ingrese una cadena valida'
    try {
      if (text === 'clear') {
        setHistory([])
        setText('')
        return ''
      }
      if (text === 'help') {
        return textHelp
      }
      if (text === 'hora') {
        return operador.hora()
      }
      if (text === 'exit') {
        handlerExit()
        return 'saliendo'
      }
      const cadena = text.toLocaleLowerCase().split('(')
      const comando = cadena[0]
      const argumentos = cadena[1].split(')')[0]
      // crear el swicht de operador
      if (comando === 'sum') {
        const splitArgumentos = argumentos.split(',')
        const a = parseInt(splitArgumentos[0])
        const b = parseInt(splitArgumentos[1])
        // pasar return a str
        return operador.sum(a, b).toString()
      }
      if (comando === 'rest') {
        const splitArgumentos = argumentos.split(',')
        const a = parseInt(splitArgumentos[0])
        const b = parseInt(splitArgumentos[1])
        // pasar return a str
        return operador.rest(a, b).toString()
      }
      if (comando === 'mult') {
        const splitArgumentos = argumentos.split(',')
        const a = parseInt(splitArgumentos[0])
        const b = parseInt(splitArgumentos[1])
        // pasar return a str
        return operador.mult(a, b).toString()
      }
      if (comando === 'div') {
        const splitArgumentos = argumentos.split(',')
        const a = parseInt(splitArgumentos[0])
        const b = parseInt(splitArgumentos[1])
        // pasar return a str
        return operador.divide(a, b).toString()
      }
    } catch (error) {
      return error.message + 'ingrese una cadena valida'
    }
  }

  const handlerExit = () => {
    exit()
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      try {
        const result = comando()
        setHistory([...history, { input: text, output: result }])
      } catch (error) {
        setHistory([...history, { input: text, output: error.message }])
      }
      setText('')
    }
  }

  return (
    <div className='text-white font-mono overflow-y-auto py-10 px-5'>
      {history.map((entry, index) => (
        <div key={index}>
          <span>{'root/home$ ' + entry.input}</span>
          <br />
          <TypingEffect text={entry.output} />
          <br />
        </div>
      ))}
      <div>
        <label htmlFor='text' className='text-white'>
          root/home${' '}
        </label>
        <input
          id='text'
          className='bg-neutral-700/0 focus:outline-none'
          value={text}
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  )
}

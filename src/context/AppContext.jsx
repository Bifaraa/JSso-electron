/* eslint-disable react/prop-types */
import { createContext, React, useState } from 'react'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [administrador, setAdministrador] = useState(false)
  const [editorTxtVisible, setEditorTxtVisible] = useState(false)
  const [consolaVisible, setConsolaVisible] = useState(false)
  const [ajustesVisible, setAjustesVisible] = useState(false)
  const [visorImgVisible, setVisorImgVisible] = useState(false)
  const [calculadora, setCalculadora] = useState(false)

  return (
    <AppContext.Provider
      value={{
        administrador,
        setAdministrador,
        editorTxtVisible,
        setEditorTxtVisible,
        consolaVisible,
        setConsolaVisible,
        ajustesVisible,
        setAjustesVisible,
        visorImgVisible,
        setVisorImgVisible,
        calculadora,
        setCalculadora
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

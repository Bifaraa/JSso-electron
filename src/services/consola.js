export function sum(a, b) {
  return a + b
}

export function mult(a, b) {
  return a * b
}

export function divide(a, b) {
  return a / b
}

export function rest(a, b) {
  return a - b
}

export function hora() {
  const now = new Date()
  const hora = now.getHours().toString().padStart(2, '0')
  const minutos = now.getMinutes().toString().padStart(2, '0')
  const segundos = now.getSeconds().toString().padStart(2, '0')
  return `${hora}:${minutos}:${segundos}`
}

const { exec } = require('child_process')

function getProcesos() {
  return new Promise((resolve, reject) => {
    if (process.platform !== 'win32') {
      exec(
        "top -b -n1 | grep electron | awk '{print $1, $10}'",
        (error, stdout, stderr) => {
          if (error) {
            reject(error)
          } else {
            resolve(stdout)
          }
        }
      )
    } else {
      reject(new Error('This function is not supported on Windows'))
    }
  })
}

const info = async () => {
  setInterval(async () => {
    const infoProcesos = await getProcesos()
    console.log(`Cantidad de procesos: ${infoProcesos}`)
    return infoProcesos
  }, 2000)
}

export default { info }

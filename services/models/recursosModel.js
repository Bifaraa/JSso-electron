const { exec } = require('child_process')

module.exports = {
  getProcesos: function (callback) {
    if (process.platform !== 'win32') {
      exec(
        "top -b -n1 | grep electron | awk '{print $1, $10, $12}'",
        (error, stdout, stderr) => {
          if (error) {
            callback(error)
          } else {
            const procesos = stdout.split('\n')
            callback(null, procesos)
          }
        }
      )
    } else {
      callback(new Error('This function is not supported on Windows'))
    }
  },
  getMemoria: function (callback) {
    if (process.platform !== 'win32') {
      exec(
        "free -h | grep -E 'Mem' | awk '{print $2, $3, $7}'",
        (error, stdout, stderr) => {
          if (error) {
            callback(error)
          } else {
            console.log(stdout)
            callback(null, stdout)
          }
        }
      )
    } else {
      callback(new Error('This function is not supported on Windows'))
    }
  },
  getSwap: function (callback) {
    if (process.platform !== 'win32') {
      exec(
        "free -h | grep -E 'Swap' | awk '{print $2, $3, $7}'",
        (error, stdout, stderr) => {
          if (error) {
            callback(error)
          } else {
            console.log(stdout)
            callback(null, stdout)
          }
        }
      )
    }
  },
  getDisco: function (callback) {
    if (process.platform !== 'win32') {
      exec(
        "df -h | grep -E 'sda2' | awk '{print $2, $4}'",
        (error, stdout, stderr) => {
          if (error) {
            callback(error)
          } else {
            console.log(stdout)
            callback(null, stdout)
          }
        }
      )
    }
  }
}

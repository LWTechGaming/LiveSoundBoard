let timer = null
function typingStopped () {
  return new Promise((resolve, reject) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

exports.typingStopped = typingStopped

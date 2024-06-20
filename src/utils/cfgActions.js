export const saveCfg = (calculatorsList, button) => {
  const jsonString = JSON.stringify(calculatorsList, null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  button.href = url
  button.download = 'data.json'
}

export const loadCfg = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = e.target.result
      resolve(data)
    }

    reader.readAsText(file)
  })
}

export const generateData = (amount, data) => {
  var result = []
  for (var i = 0; i < amount; i += 1) {
    data.id = (i + 1).toString()
    result.push(Object.assign({}, data))
  }
  return result
}

export const createHeaders = (keys) => {
  var result = []
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 48,
      align: 'center',
      padding: 0
    })
  }
  return result
}

export const createPdf = (calculatorsList) => {}

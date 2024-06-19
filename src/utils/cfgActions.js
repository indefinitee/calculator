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

export const saveCfg = (calculatorsList, button) => {
  const timeDate = new Date()

  const jsonString = JSON.stringify(Array.from(calculatorsList.entries()), null, 2)

  const blob = new Blob([jsonString], { type: 'application/json' })

  const url = URL.createObjectURL(blob)

  button.href = url
  button.download = `ПожТехКабель Конфигурация от ${timeDate.toLocaleDateString()}.json`
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

// Пример данных
export const exampleData = [
  { name: 'КПСнг(А)-FRLS 1x2x0,75 (200м) ЭНТЭ', unit: 'м', quantity: 1000 },
  {
    name: 'Труба гофр. тяжелая самозатух. ТГТ СЗ ПВХ 16 мм с зондом (100 м) ПожТехКабель (710-001)',
    unit: 'м',
    quantity: 1000
  },
  {
    name: 'Скоба металлическая однолапковая 16-17 мм (100 шт/уп) ПожТехКабель PTK-Accessories (850-004)',
    unit: 'м',
    quantity: 3000
  },
  {
    name: 'Саморез 3,5x35 мм (1000 шт/уп) ПожТехКабель PTK-Accessories (860-005)',
    unit: 'шт',
    quantity: 3000
  },
  {
    name: 'Дюбель металлический 5х30мм (500 шт/уп) ПожТехКабель PTK-Accessories (861-005)',
    unit: 'шт',
    quantity: 3000
  }
]

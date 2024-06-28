export const getCcResults = (calcData) => {
  const totalCablesLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)
  const totalCablesCount = calcData.groups.reduce((acc, group) => acc + group.elements.length, 0)

  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getCcDirectMontage(calcData, totalCablesLength, totalCablesCount)
    case 'Стандартный':
      return getCcBaseMontage(calcData, totalCablesLength, totalCablesCount)
  }
}

const getCcDirectMontage = (calcData, length, count) => {
  calcData.results = {
    'ДМОУ-С пр.': length * 3,
    'Гвозди Fedast': Math.ceil(length / 1000),
    'Газ. баллон': Math.ceil(length / 1000),
    'Количество кабеля': count,
    'Кабель канал': length
  }
}

const getCcBaseMontage = (calcData, length, count) => {
  if (calcData.selectedDowelType === 'ДМОУ-С') {
    calcData.results = {
      'Количество дюбелей': length * 3,
      'Количество саморезов': length * 3,
      'Количество кабеля': count,
      'Кабель канал': length
    }
  } else {
    calcData.results = {
      'Количество дюбелей': length * 6,
      'Количество саморезов': length * 6
    }
  }
}

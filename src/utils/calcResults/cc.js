export const getCcResults = (calcData) => {
  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getCcDirectMontage(calcData)
    case 'Стандартный':
      return getCcBaseMontage(calcData)
  }
}

const getCcDirectMontage = (calcData) => {
  const totalCabelsLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)

  calcData.results = {
    'ДМОУ-С пр.': totalCabelsLength * 3,
    'Гвозди Fedast': Math.ceil(totalCabelsLength / 1000),
    'Газ. баллон': Math.ceil(totalCabelsLength / 1000),
    'Количество кабеля': totalCabelsLength,
    'Кабель канал': totalCabelsLength
  }
}

const getCcBaseMontage = (calcData) => {
  const totalCabelsLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)

  if (calcData.selectedDowelType === 'ДМОУ-С') {
    calcData.results = {
      'Количество дюбелей': totalCabelsLength * 3,
      'Количество саморезов': totalCabelsLength * 3,
      'Количество кабеля': totalCabelsLength,
      'Кабель канал': totalCabelsLength
    }
  } else {
    calcData.results = {
      'Количество дюбелей': totalCabelsLength * 6,
      'Количество саморезов': totalCabelsLength * 6
    }
  }
}

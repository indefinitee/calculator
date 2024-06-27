export const getOpResults = (calcData) => {
  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getOpDirectMontage(calcData)
    case 'Стандартный':
      return getOpBaseMontage(calcData)
  }
}

const getOpBaseMontage = (calcData) => {
  const totalCabelsLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)
  const totalCabelsCount = calcData.groups.reduce((acc, group) => acc + group.elements.length, 0)
  const totalGroupsCount = calcData.groups.length

  switch (calcData.selectedDowelType) {
    case 'ДМОУ-2К':
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': totalCabelsLength * 6,
        'Количество саморезов': totalCabelsLength * 6,
        'Количество скоб': Math.trunc(totalCabelsCount / 2) + 1
      }
      break

    case 'ДМОУ-С':
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': totalCabelsLength * 3,
        'Количество саморезов': totalCabelsLength * 3,
        'Количество кабеля': totalCabelsCount,
        'Количество скоб': totalGroupsCount
      }
      break

    default:
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': totalCabelsLength * 6,
        'Количество саморезов': totalCabelsLength * 6,
        'Количество скоб': totalCabelsCount
      }
  }
}

const getOpDirectMontage = (calcData) => {
  const totalCabelsLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)

  calcData.results = {
    '(840-005) ДМОУ-С пр.': totalCabelsLength * 3,
    'Гвозди Fedast': Math.ceil(totalCabelsLength / 1000),
    'Газ. баллон': Math.ceil(totalCabelsLength / 1000),
    'Количество кабеля': totalCabelsLength
  }
}

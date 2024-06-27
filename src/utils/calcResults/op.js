export const getOpResults = (calcData) => {
  const totalCablesLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)
  const totalCablesCount = calcData.groups.reduce((acc, group) => acc + group.elements.length, 0)
  const totalGroupsCount = calcData.groups.length

  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getOpDirectMontage(calcData, totalCablesLength)
    case 'Стандартный':
      return getOpBaseMontage(calcData, totalCablesLength, totalCablesCount, totalGroupsCount)
  }
}

const getOpBaseMontage = (calcData, length, cablesCount, groupsCount) => {
  switch (calcData.selectedDowelType) {
    case 'ДМОУ-2К':
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': length * 6,
        'Количество саморезов': length * 6,
        'Количество скоб': Math.trunc(cablesCount / 2) + 1
      }
      break

    case 'ДМОУ-С':
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': length * 3,
        'Количество саморезов': length * 3,
        'Количество кабеля': cablesCount,
        'Количество скоб': groupsCount
      }
      break

    default:
      calcData.results = {
        'Тип крепежа': calcData.selectedDowelType,
        'Количество дюбелей': length * 6,
        'Количество саморезов': length * 6,
        'Количество скоб': cablesCount
      }
  }
}

const getOpDirectMontage = (calcData, length) => {
  calcData.results = {
    '(840-005) ДМОУ-С пр.': length * 3,
    'Гвозди Fedast': Math.ceil(length / 1000),
    'Газ. баллон': Math.ceil(length / 1000),
    'Количество кабеля': length
  }
}

export const getOpResults = (calcData) => {
  const totalCablesLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)
  const totalCablesCount = calcData.groups.reduce((acc, group) => acc + group.elements.length, 0)
  const totalGroupsCount = calcData.groups.length

  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getOpDirectMontage(calcData, totalCablesLength, totalCablesCount)
    case 'Стандартный':
      return getOpBaseMontage(calcData, totalCablesLength, totalCablesCount, totalGroupsCount)
  }
}

const getOpBaseMontage = (calcData, length, cablesCount, groupsCount) => {
  if (!calcData.selectedDowelType) {
    calcData.results = {}
  } else if (calcData.selectedDowelType === 'ДМОУ-2К') {
    calcData.results = {
      'Тип крепежа': calcData.selectedDowelType,
      'Количество дюбелей': length * 6,
      'Количество саморезов': length * 6,
      'Количество скоб': Math.trunc(cablesCount / 2) + 1
    }
  } else if (calcData.selectedDowelType === 'ДМОУ-С') {
    calcData.results = {
      'Тип крепежа': calcData.selectedDowelType,
      'Количество дюбелей': length * 3,
      'Количество саморезов': length * 3,
      'Количество кабеля': cablesCount,
      'Количество скоб': groupsCount
    }
  } else {
    calcData.results = {
      'Тип крепежа': calcData.selectedDowelType,
      'Количество дюбелей': length * 6,
      'Количество саморезов': length * 6,
      'Количество скоб': cablesCount
    }
  }
}

const getOpDirectMontage = (calcData, length, count) => {
  calcData.results = {
    '(840-005) ДМОУ-С пр.': length * 3,
    'Гвозди Fedast': Math.ceil(length / 1000),
    'Газ. баллон': Math.ceil(length / 1000),
    'Количество кабеля': count
  }
}

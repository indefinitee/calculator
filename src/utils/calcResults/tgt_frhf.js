export const getTgtFrhfResults = (calcData) => {
  const totalCablesLength = calcData.groups.reduce((acc, group) => acc + group.totalLength, 0)
  const totalCablesCount = calcData.groups.reduce((acc, group) => acc + group.elements.length, 0)
  const totalGroupsCount = calcData.groups.length

  switch (calcData.selectedMontage) {
    case 'Прямой монтаж':
      return getTgtFrhfDirectMontage(calcData, totalCablesLength, totalCablesCount)
    case 'Стандартный':
      return getTgtFrhfBaseMontage(calcData, totalCablesLength, totalCablesCount, totalGroupsCount)
  }
}

const getTgtFrhfDirectMontage = (calcData, length, count) => {
  if (calcData.selectedBracket === 'Однолапковая') {
    calcData.results = {
      'Количество кабеля': count,
      'Количество трубы': length,
      'Количество скоб': length * 3,
      'Гвозди Fedast': Math.ceil(length / 1000),
      'Газ. баллон': Math.ceil(length / 1000)
    }
  }

  if (calcData.selectedBracket === 'Двухлапковая') {
    calcData.results = {
      'Количество кабеля': count,
      'Количество трубы': length,
      'Количество скоб': length * 3,
      'Гвозди Fedast': Math.ceil(length / 500),
      'Газ. баллон': Math.ceil(length / 500)
    }
  }

  if (!calcData.selectedBracket) {
    calcData.results = {}
  }
}

const getTgtFrhfBaseMontage = (calcData, length, count) => {
  if (calcData.selectedBracket === 'Однолапковая') {
    calcData.results = {
      'Количество кабеля': count,
      'Количество трубы': count,
      'Количество скоб': length * 3,
      'Количество саморезов': length * 3,
      'Количество дюбелей': length * 3
    }
  }

  if (calcData.selectedBracket === 'Двухлапковая') {
    calcData.results = {
      'Количество кабеля': count,
      'Количество трубы': count,
      'Количество скоб': length * 3,
      'Количество саморезов': length * 6,
      'Количество дюбелей': length * 6
    }
  }

  if (!calcData.selectedBracket) {
    calcData.results = {}
  }
}

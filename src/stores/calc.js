import { initialCalculator } from '@/data/constants/initialState'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCalcStore = defineStore('calc', () => {
  const calculator = ref(null)

  if (localStorage.getItem('calculator')) {
    calculator.value = cloneDeep(JSON.parse(localStorage.getItem('calculator')))
  } else {
    calculator.value = cloneDeep(initialCalculator)
  }

  const results = ref([])

  const nextId = computed(() => {
    const lastCalculator = calculator.value.at(-1)
    return lastCalculator ? lastCalculator.id + 1 : 1
  })

  const calcLength = computed(() => calculator.value.length)

  const removeCalc = (id) => {
    calculator.value = calculator.value.filter((calc) => calc.id !== id)
  }

  const updateCalc = (calculatorList) => {
    calculator.value = calculatorList
  }

  const saveCalcToLocalStorage = () => {
    localStorage.setItem('calculator', JSON.stringify(calculator.value))
  }

  const addCalc = () => {
    calculator.value.push({
      id: nextId.value,
      selectedOkl: null,
      selectedMontage: null,
      selectedBracket: null,
      secondaryTypes: [],
      groups: [
        {
          id: 1,
          name: null,
          totalSection: 0,
          elements: [
            {
              id: 1,
              section: 0,
              length: 0
            }
          ]
        }
      ],
      results: []
    })
  }

  const clearCalc = () => {
    calculator.value = cloneDeep(initialCalculator)
  }
  const getPropertyValue = (id, propName) => {
    const calc = calculator.value.find((calc) => calc.id === id)
    return calc ? calc[propName] : null
  }

  const setTypeValue = (id, type, value) => {
    const calc = calculator.value.find((calc) => calc.id === id)

    if (calc) calc[type] = value
  }

  return {
    calculator,
    results,
    calcLength,
    saveCalcToLocalStorage,
    nextId,
    removeCalc,
    clearCalc,
    addCalc,
    updateCalc,
    getSelectedOkl: (id) => getPropertyValue(id, 'selectedOkl'),
    getSelectedMontage: (id) => getPropertyValue(id, 'selectedMontage'),
    getSelectedBracket: (id) => getPropertyValue(id, 'selectedBracket'),
    setTypeValue
  }
})

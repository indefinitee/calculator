import {
  CALC_LOCAL_STORAGE_KEY,
  getInitialState,
  initializeStore
} from '@/data/constants/initialState'
import { isEmpty } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const getCalculator = () => {
  const calculator = localStorage.getItem(CALC_LOCAL_STORAGE_KEY)

  if (isEmpty(calculator)) {
    return initializeStore()
  }

  try {
    const parsedStorage = JSON.parse(calculator)
    return new Map(parsedStorage)
  } catch (error) {
    console.error('Ошибка при загрузке состояния из localStorage:', error)
    return initializeStore()
  }
}

export const useCalcStore = defineStore('calc', () => {
  const calculator = ref(getCalculator())

  const results = ref([])

  const nextId = computed(() => {
    if (calculator.value.size === 0) {
      return 1
    }
    const maxId = Math.max(...Array.from(calculator.value.keys()))
    return maxId + 1
  })

  const calcLength = computed(() => calculator.value.size)

  const removeCalc = (id) => {
    calculator.value.delete(id)
  }

  const getCalcById = (id) => {
    if (!calculator.value.has(id)) return

    return calculator.value.get(id)
  }

  const updateCalc = (calculatorList) => {
    calculator.value = null
    calculator.value = calculatorList
    clearLocalStorage()
  }

  const saveCalcToLocalStorage = () => {
    if (!isEmpty(calculator.value)) {
      return localStorage.setItem(
        CALC_LOCAL_STORAGE_KEY,
        JSON.stringify(Array.from(calculator.value.entries()))
      )
    }

    clearLocalStorage()
  }

  const clearLocalStorage = () => {
    localStorage.removeItem(CALC_LOCAL_STORAGE_KEY)
  }

  const addCalc = () => {
    calculator.value.set(nextId.value, getInitialState())
  }

  const clearCalc = () => {
    calculator.value = null
    calculator.value = initializeStore()
    clearLocalStorage()
  }
  const getPropertyValue = (id, propName) => {
    const calc = calculator.value.get(id)
    return calc ? calc[propName] : null
  }

  const setTypeValue = (id, type, value) => {
    const calc = calculator.value.get(id)

    if (calc) calc[type] = value
  }

  const getCalcResults = (id) => {
    const calc = getCalcById(id)
    return calc ? calc.results : []
  }

  const updateCalcResults = (id, results) => {
    const calc = getCalcById(id)
    if (calc) {
      calc.results = results
    }
  }

  return {
    calculator,
    results,
    getSelectedOkl: (id) => getPropertyValue(id, 'selectedOkl'),
    getSelectedMontage: (id) => getPropertyValue(id, 'selectedMontage'),
    getSelectedBracket: (id) => getPropertyValue(id, 'selectedBracket'),
    getSelectedDowelType: (id) => getPropertyValue(id, 'selectedDowelType'),
    calcLength,
    saveCalcToLocalStorage,
    clearLocalStorage,
    nextId,
    removeCalc,
    clearCalc,
    addCalc,
    updateCalc,
    getCalcById,
    getCalcResults,
    updateCalcResults,
    setTypeValue
  }
})

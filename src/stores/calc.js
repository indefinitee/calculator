import { defineStore } from 'pinia'
import { ref } from 'vue'

const initialCalculator = {
  id: 1,
  selectedOkl: null,
  selectedInstall: null,
  secondaryTypes: [],
  groups: [
    {
      id: 1,
      name: null,
      elements: []
    }
  ],
  results: {}
}

export const useCalcStore = defineStore('calc', () => {
  const calculator = ref([
    {
      id: 1,
      selectedOkl: null,
      selectedInstall: null,
      secondaryTypes: [],
      groups: [
        {
          id: 1,
          name: null,
          elements: []
        }
      ],
      results: {}
    }
  ])

  const nextId = ref(2)

  const removeCalc = (id) => {
    calculator.value = calculator.value.filter((calc) => calc.id !== id)

    if (calculator.value.length === 0) {
      nextId.value = 1
    } else {
      nextId.value = calculator.value[calculator.value.length - 1].id + 1
    }
  }

  const updateCalc = (calculatorList) => {
    calculator.value = calculatorList
  }

  const addCalc = () => {
    calculator.value.push({
      id: nextId.value,
      selectedOkl: null,
      selectedInstall: null,
      secondaryTypes: [],
      groups: [
        {
          id: 1,
          name: null,
          elements: []
        }
      ],
      results: {}
    })
    nextId.value++
  }

  const clearCalc = () => {
    calculator.value = [
      {
        ...initialCalculator
      }
    ]
    nextId.value = 2
  }

  return { calculator, nextId, removeCalc, clearCalc, addCalc, updateCalc }
})

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const initialCalculator = {
  id: 1,
  selectedOkl: null,
  selectedMontage: null,
  selectedBracket: null,
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
  const calculator = ref([{ ...initialCalculator }])

  const nextId = computed(() => {
    if (calcLength.value === 0) {
      return 1
    }

    return calculator.value[calculator.value.length - 1].id + 1
  })

  const calcLength = computed(() => {
    return calculator.value.length
  })

  const removeCalc = (id) => {
    calculator.value = calculator.value.filter((calc) => calc.id !== id)
  }

  const updateCalc = (calculatorList) => {
    calculator.value = calculatorList
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
          elements: []
        }
      ],
      results: {}
    })
  }

  const clearCalc = () => {
    calculator.value = [
      {
        ...initialCalculator
      }
    ]
  }

  return { calculator, calcLength, nextId, removeCalc, clearCalc, addCalc, updateCalc }
})

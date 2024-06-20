import { initialCalculator } from '@/data/constants/initialState'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCalcStore = defineStore('calc', () => {
  const calculator = ref(cloneDeep(initialCalculator))

  const results = ref([])

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

  return { calculator, calcLength, results, nextId, removeCalc, clearCalc, addCalc, updateCalc }
})

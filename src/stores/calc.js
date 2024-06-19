import { defineStore } from 'pinia'
import { ref } from 'vue'

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

  const addCalc = () => {
    calculator.value.push({
      id: nextId.value,
      selectedOkl: null,
      selectedInstall: null,
      secondaryTypes: [],
      groups: [],
      results: {}
    })
    nextId.value++
  }

  const clearCalc = () => {
    calculator.value = [
      {
        id: 1,
        selectedOkl: null,
        selectedInstall: null,
        secondaryTypes: [],
        groups: [],
        results: {}
      }
    ]
    nextId.value = 2
  }

  return { calculator, nextId, removeCalc, clearCalc, addCalc }
})

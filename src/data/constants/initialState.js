export const initializeStore = () => new Map([[1, getInitialState()]])
export const getInitialState = () => ({
  selectedOkl: null,
  selectedMontage: null,
  selectedBracket: null,
  selectedDowelType: null,
  selectedDowel: null,
  selectedScrew: null,
  groups: [
    {
      id: 1,
      totalLength: 0,
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
  results: {},
  isCalculated: false
})

export const CALC_LOCAL_STORAGE_KEY = 'calculator'

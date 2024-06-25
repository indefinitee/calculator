export const initializeStore = () =>
  new Map([
    [
      1,
      {
        selectedOkl: null,
        selectedMontage: null,
        selectedBracket: null,
        selectedDowelType: null,
        selectedDowel: null,
        selectedScrew: null,
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
        results: {}
      }
    ]
  ])
export const getInitialState = () => ({
  selectedOkl: null,
  selectedMontage: null,
  selectedBracket: null,
  selectedDowelType: null,
  selectedDowel: null,
  selectedScrew: null,
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
  results: {}
})

export const CALC_LOCAL_STORAGE_KEY = 'calculator'

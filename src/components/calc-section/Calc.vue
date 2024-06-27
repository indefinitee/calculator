<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import CableGroup from '@/components/cable-group/CableGroup.vue'
import CalcType from '@/components/calc-type-line/CalcType.vue'
import dowelTypes from '@/data/lists/dowelTypes.json'
import fastenerTypes from '@/data/lists/fastenerTypes.json'
import types from '@/data/types/types.json'
import { useCalcStore } from '@/stores/calc'
import { computed, toRef, watch } from 'vue'

const props = defineProps({
  title: String,
  id: Number
})

const calcStore = useCalcStore()

const calc = computed(() => calcStore.getCalcById(props.id))

const groups = toRef(calc.value, 'groups')

const selectedOkl = computed(() => calcStore.getSelectedOkl(props.id))
const selectedMontage = computed(() => calcStore.getSelectedMontage(props.id))
const selectedBracket = computed(() => calcStore.getSelectedBracket(props.id))
const selectedDowelType = computed(() => calcStore.getSelectedDowelType(props.id))
const selectedDowel = toRef(calc.value, 'selectedDowel')
const selectedScrew = toRef(calc.value, 'selectedScrew')

const selectedSecondaryComponent = computed(() => {
  if (selectedOkl.value === 'ТГТ СЗ' || selectedOkl.value === 'ТГ FRHF') {
    return types.secondary
  }
  return null
})

const showDowelTypeComponent = computed(() => {
  if (selectedOkl.value === 'ОП' && selectedMontage.value === 'Стандартный') {
    return true
  }

  if (selectedOkl.value === 'КК' && selectedMontage.value === 'Стандартный') {
    return true
  }

  return false
})

const handleTypeChange = (type, value) => {
  calcStore.setTypeValue(props.id, type, value)

  handleResultsChange()
}

const removeGroup = (groupId) => {
  const index = groups.value.findIndex((item) => item.id === groupId)

  if (groups.value.length > 1 && index !== -1) {
    groups.value.splice(index, 1)
  }
}

watch(selectedSecondaryComponent, (newValue) => {
  if (newValue === null) {
    return calcStore.setTypeValue(props.id, 'selectedBracket', null)
  }
})

watch(selectedDowel, (newDowelCode) => {
  const dowel = dowelTypes.find((d) => d.dowelCode === newDowelCode)
  if (dowel) {
    selectedScrew.value = dowel.screwCode
  } else {
    selectedScrew.value = null
  }
})

const handleResultsChange = () => calcStore.changeCalcResults(props.id)
</script>

<template>
  <section class="calc relative">
    <div class="calc__header absolute relative">
      <span class="calc__header-text">{{ props?.title }}</span>
      <button @click="calcStore.removeCalc(props.id)" class="btn calc__header-btn absolute">
        <img :src="removeIcon" alt="removeCalculatorSection" />
      </button>
    </div>

    <div class="calc-type-container">
      <CalcType
        v-for="(item, id) in types.main"
        :key="id"
        :calcId="props.id"
        :title="item.title"
        :typeClass="'calc-type--' + item.type"
        :radioButtons="item.elements"
        :radioName="item.name"
        :selectedValue="item.name === 'selectedOkl' ? selectedOkl : selectedMontage"
        @change="handleTypeChange(item.name, $event)"
      />

      <CalcType
        v-if="selectedSecondaryComponent"
        :calcId="props.id"
        :title="selectedSecondaryComponent.title"
        :typeClass="'calc-type--' + selectedSecondaryComponent.type"
        :radioButtons="selectedSecondaryComponent.elements"
        :radioName="selectedSecondaryComponent.name"
        :selectedValue="selectedBracket"
        @change="handleTypeChange(selectedSecondaryComponent.name, $event)"
      />

      <CalcType
        v-if="showDowelTypeComponent"
        :calcId="props.id"
        :title="'Тип крепежа'"
        :typeClass="'calc-type--1'"
        :radioButtons="fastenerTypes.elements"
        :radioName="fastenerTypes.name"
        :selectedValue="selectedDowelType"
        @change="handleTypeChange(fastenerTypes.name, $event)"
      />

      <div v-if="selectedMontage === 'Стандартный'" class="calc-type__select-container">
        <select class="cable-line__select" v-model="selectedDowel">
          <option disabled :value="null">Выберите тип дюбеля</option>
          <option v-for="(option, id) in dowelTypes" :key="id" :value="option.dowelCode">
            {{ option.dowelTitle + ' ' + '(Код' + ' ' + option.dowelCode + ')' }}
          </option>
        </select>

        <select class="cable-line__select" v-model="selectedScrew" :disabled="!selectedDowel">
          <option disabled value="null">Тип самореза</option>
          <option :value="selectedScrew">
            {{
              dowelTypes.find((screw) => screw.screwCode === selectedScrew)?.screwTitle +
              ' ' +
              '(Код' +
              ' ' +
              selectedScrew +
              ')'
            }}
          </option>
        </select>
      </div>
    </div>

    <div class="calc-group-container">
      <CableGroup
        v-for="(group, index) in groups"
        :key="group.id"
        :groupId="group.id"
        :title="
          'Группа #' + (index + 1) + ' / ' + (selectedOkl ? selectedOkl : 'Не выбран тип ОКЛ')
        "
        :calcData="calc"
        :calcId="props.id"
        @removeGroup="removeGroup(group.id)"
        @updateResults="handleResultsChange"
      />
    </div>
  </section>
</template>

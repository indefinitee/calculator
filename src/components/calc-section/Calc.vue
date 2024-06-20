<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import CableGroup from '@/components/cable-group/CableGroup.vue'
import CalcType from '@/components/calc-type-line/CalcType.vue'
import types from '@/data/types/types.json'
import { useCalcStore } from '@/stores/calc'
import { computed, ref, toRef } from 'vue'

const props = defineProps({
  title: String,
  id: Number
})

const calcStore = useCalcStore()

const calc = computed(() => calcStore.calculator.find((item) => item.id === props.id))

const calcTypes = ref(types)

const groups = toRef(calc.value, 'groups')

const selectedSecondaryComponent = computed(() => {
  if (selectedOkl.value === 'ТГТ' || selectedOkl.value === 'ТГ FRHF') {
    return calcTypes.value.secondary.find((item) => item.name === 'bracket')
  }
  return null
})

const selectedMainTypeName = computed(() => {
  return selectedOkl.value ? selectedOkl.value : 'Не выбран тип ОКЛ'
})

const handleTypeChange = (type, value) => {
  switch (type) {
    case 'okl':
      selectedOkl.value = value
      break
    case 'montage':
      selectedMontage.value = value
      break
    case 'bracket':
      selectedBracket.value = value
      break
  }
}

const removeGroup = (id) => {
  if (groups.value.length > 1) {
    groups.value = groups.value.filter((group) => group.id !== id)
  }
}

const selectedOkl = toRef(calc.value, 'selectedOkl')
const selectedMontage = toRef(calc.value, 'selectedMontage')
const selectedBracket = toRef(calc.value, 'selectedBracket')
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
        v-for="(item, id) in calcTypes.main"
        :key="id"
        :calcId="props.id"
        :title="item.title"
        :typeClass="'calc-type--' + item.type"
        :radioButtons="item.elements"
        :radioName="item.name"
        :selectedValue="item.name === 'okl' ? selectedOkl : selectedMontage"
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
    </div>

    <div class="calc-group-container">
      <CableGroup
        v-for="(group, id) in groups"
        :key="group.id"
        :groupId="group.id"
        :title="'Группа #' + (id + 1) + ' / ' + selectedMainTypeName"
        :selectedOkl="selectedOkl"
        :calcId="props.id"
        @removeGroup="removeGroup(group.id)"
      />
    </div>
  </section>
</template>

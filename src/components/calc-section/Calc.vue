<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import CableGroup from '@/components/cable-group/CableGroup.vue'
import CalcType from '@/components/calc-type-line/CalcType.vue'
import dowelTypes from '@/data/lists/dowelTypes.json'
import fastenerTypes from '@/data/lists/fastenerTypes.json'
import screwTypes from '@/data/lists/screwTypes.json'
import types from '@/data/types/types.json'
import { useCalcStore } from '@/stores/calc'
import { computed, toRef, watch } from 'vue'

const props = defineProps({
  title: String,
  id: Number
})

const calcStore = useCalcStore()

const calc = computed(() => calcStore.calculator.find((item) => item.id === props.id))

const groups = toRef(calc.value, 'groups')

const selectedOkl = computed(() => calcStore.getSelectedOkl(props.id))
const selectedMontage = computed(() => calcStore.getSelectedMontage(props.id))
const selectedBracket = computed(() => calcStore.getSelectedBracket(props.id))
const selectedDowelType = computed(() => calcStore.getSelectedDowelType(props.id))
const selectedDowel = toRef(calc.value, 'selectedDowel')
const selectedScrew = toRef(calc.value, 'selectedScrew')

const selectedSecondaryComponent = computed(() => {
  if (selectedOkl.value === 'ТГТ' || selectedOkl.value === 'ТГ FRHF') {
    return types.secondary.find((item) => item.name === 'selectedBracket')
  }
  return null
})

const selectedMainTypeName = computed(() => {
  return selectedOkl.value ? selectedOkl.value : 'Не выбран тип ОКЛ'
})

const handleTypeChange = (type, value) => {
  calcStore.setTypeValue(props.id, type, value)
}

const removeGroup = (groupId) => {
  if (groups.value.length > 1) {
    groups.value = groups.value.filter((group) => group.id !== groupId)
  }
}

watch(selectedSecondaryComponent, (newValue) => {
  if (newValue === null) {
    calcStore.setTypeValue(props.id, 'selectedBracket', null)
  }
})
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

      <template v-if="selectedMontage === 'Стандартный'">
        <CalcType
          :calcId="props.id"
          :title="'Тип крепежа'"
          :typeClass="'calc-type--2'"
          :radioButtons="fastenerTypes.elements"
          :radioName="fastenerTypes.name"
          :selectedValue="selectedDowelType"
          @change="handleTypeChange(fastenerTypes.name, $event)"
        />

        <div class="calc-type__select-container">
          <select class="cable-line__select" v-model="selectedDowel">
            <option disabled :value="null">Выберите тип дюбеля</option>
            <option v-for="(option, id) in dowelTypes" :key="id" :value="option.code">
              {{ option.title + ' ' + '(Код' + ' ' + option.code + ')' }}
            </option>
          </select>

          <select class="cable-line__select" v-model="selectedScrew">
            <option disabled :value="null">Выберите тип самореза</option>
            <option v-for="(option, id) in screwTypes" :key="id" :value="option.code">
              {{ option.title + ' ' + '(Код' + ' ' + option.code + ')' }}
            </option>
          </select>
        </div>
      </template>
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

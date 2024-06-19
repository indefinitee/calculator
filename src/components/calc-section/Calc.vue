<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import CableGroup from '@/components/cable-group/CableGroup.vue'
import CalcType from '@/components/calc-type-line/CalcType.vue'
import types from '@/data/types/types.json'
import { useCalcStore } from '@/stores/calc'
import { computed, ref, watch } from 'vue'

const props = defineProps({
  title: String,
  id: Number
})

const groups = ref([{ id: 1 }])
const calcStore = useCalcStore()

const calcTypes = ref(types)
const selectedMainType = ref(null)
const selectedMontageType = ref(null)

const selectedSecondaryComponent = computed(() => {
  if (selectedMainType.value === 'ТГТ' || selectedMainType.value === 'ТГ FRHF') {
    return calcTypes.value.secondary.find((item) => item.name === 'bracket')
  }
  return null
})

const handleMainTypeChange = (type, value) => {
  if (type === 'okl') {
    selectedMainType.value = value
  }
  if (type === 'montage') {
    selectedMontageType.value = value
  }
  console.log(selectedMainType.value, selectedMontageType.value)
}

const removeGroup = (id) => {
  if (groups.value.length > 1) {
    groups.value = groups.value.filter((group) => group.id !== id)
  }
}
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
        :radioName="item.name + props.id"
        @change="handleMainTypeChange(item.name, $event.target.value)"
      />

      <CalcType
        v-if="selectedSecondaryComponent"
        :calcId="props.id"
        :title="selectedSecondaryComponent.title"
        :typeClass="'calc-type--' + selectedSecondaryComponent.type"
        :radioButtons="selectedSecondaryComponent.elements"
        :radioName="selectedSecondaryComponent.name + props.id"
      />
    </div>

    <div class="calc-group-container">
      <CableGroup
        v-for="(group, id) in groups"
        :key="group.id"
        :title="'Группа #' + (id + 1) + ' / ' + 'Не выбран тип'"
        @removeGroup="removeGroup(group.id)"
      />
    </div>
  </section>
</template>

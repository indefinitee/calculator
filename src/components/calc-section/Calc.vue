<script setup>
import { ref } from 'vue'
import removeIcon from '../../assets/icons/removeicon.svg'
import CableGroup from './../cable-group/CableGroup.vue'
import CalcType from './../calc-type-line/CalcType.vue'

const props = defineProps({
  title: String,
  id: Number
})

const emits = defineEmits(['removeCalculator'])

const titles = ['ТГ FRHF 80мм', 'КК  40мм  МАРКИРОВКА']

const groups = ref([{ id: 1 }])

const radioComponents = [
  {
    title: 'Тип ОКЛ',
    radioButtons: ['ОП', 'ТГТ С3', 'КК', 'ТГ FRHF'],
    type: 1
  },
  {
    title: 'Тип монтажа',
    radioButtons: ['Прямой монтаж', 'Стандартный'],
    type: 2
  }
]

const removeCalc = () => {
  emits('removeCalculator', props.id)
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
      <button @click="removeCalc" class="btn calc__header-btn absolute">
        <img :src="removeIcon" alt="removeCalculatorSection" />
      </button>
    </div>

    <div class="calc-type-container">
      <CalcType
        v-for="(item, id) in radioComponents"
        :key="id"
        :title="item.title"
        :typeClass="'calc-type--' + item.type"
        :radioButtons="item.radioButtons"
        :radioName="'row' + id"
      />
    </div>

    <div class="calc-group-container">
      <CableGroup
        v-for="(group, id) in groups"
        :key="group.id"
        :title="'Группа #' + (id + 1) + ' / ' + titles[id]"
        @removeGroup="removeGroup(group.id)"
      />
    </div>
  </section>
</template>

<script setup>
import { useCalcStore } from '@/stores/calc'
import { toRefs } from 'vue'
import TypeRadio from '../type-radio/TypeRadio.vue'

const calcStore = useCalcStore()

const { calculator } = toRefs(calcStore)

const props = defineProps({
  title: String,
  radioButtons: Array,
  radioName: String,
  typeClass: String,
  calcId: Number
})

const updateSelected = (value) => {
  const calc = calculator.value.find((c) => c.id === props.calcId)
  if (calc) {
    if (props.radioName === 'okl') {
      calc.selectedOkl = value
    } else if (props.radioName === 'install') {
      calc.selectedInstall = value
    }
  }
}
</script>

<template>
  <div class="flex">
    <div class="calc-type__header">
      <h3 class="calc-type__title">{{ title }}</h3>
    </div>
    <ul class="calc-type" :class="typeClass">
      <TypeRadio
        v-for="(item, index) in radioButtons"
        :key="index"
        :name="item"
        :radioName="radioName"
        @update:selected="updateSelected"
      />
    </ul>
  </div>
</template>

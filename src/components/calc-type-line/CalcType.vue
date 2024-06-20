<script setup>
import TypeRadio from '@/components/type-radio/TypeRadio.vue'

const props = defineProps({
  title: String,
  radioButtons: Array,
  radioName: String,
  typeClass: String,
  calcId: Number,
  selectedValue: [String, Object]
})

const emit = defineEmits(['change'])

const handleRadioChange = (value) => {
  emit('change', value)
}
</script>

<template>
  <div class="flex">
    <div class="calc-type__header">
      <h3 class="calc-type__title">{{ title }}</h3>
    </div>
    <ul class="calc-type" :class="typeClass">
      <TypeRadio
        v-for="(item, index) in props.radioButtons"
        :key="index"
        :name="item"
        :radioName="props.radioName"
        :calcId="props.calcId"
        :selectedValue="props.selectedValue"
        @change="handleRadioChange"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  title: String,
  radioButtons: Array,
  radioName: String,
  typeClass: String,
  calcId: Number,
  selectedValue: [String, Object]
})

const emit = defineEmits(['change'])

const localValues = ref(
  props.radioButtons.map((item) => ({
    name: item,
    checked: item === props.selectedValue
  }))
)

watch(
  () => props.selectedValue,
  (newValue) => {
    localValues.value.forEach((item) => {
      item.checked = item.name === newValue
    })
  }
)

const handleChange = (value) => {
  emit('change', value)
}

const handleRadioChange = (event) => {
  const selectedValue = event.target.value
  localValues.value.forEach((item) => {
    item.checked = item.name === selectedValue
  })
  handleChange(selectedValue)
}
</script>

<template>
  <div class="flex">
    <div class="calc-type__header">
      <h3 class="calc-type__title">{{ title }}</h3>
    </div>
    <ul class="calc-type" :class="typeClass">
      <li v-for="(item, index) in localValues" :key="index" class="calc-type-item">
        <label class="calc-type-label">
          <input
            :name="radioName + calcId"
            :value="item.name"
            type="radio"
            class="calc-type-input"
            :checked="item.checked"
            @change="handleRadioChange"
          />
          <span class="calc-type-text">{{ item.name }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

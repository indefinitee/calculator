<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  name: String,
  radioName: String,
  calcId: Number,
  selectedValue: [String, Object]
})

const emit = defineEmits(['change'])

const localValue = ref(props.selectedValue)

watch(
  () => props.selectedValue,
  (newValue) => {
    localValue.value = newValue
  }
)

const handleChange = (event) => {
  localValue.value = event.target.value
  emit('change', localValue.value)
}
</script>

<template>
  <li class="calc-type-item">
    <label class="calc-type-label"
      ><input
        :name="props.radioName + props.calcId"
        :value="props.name"
        type="radio"
        class="calc-type-input"
        :checked="localValue === props.name"
        @change="handleChange"
      /><span class="calc-type-text">{{ props.name }}</span></label
    >
  </li>
</template>

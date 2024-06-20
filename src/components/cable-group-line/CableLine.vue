<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import cableTypes from '@/data/lists/cableTypes.json'
import { ref, watch, watchEffect } from 'vue'

const props = defineProps({
  id: Number,
  initialSection: Number,
  initialLength: Number
})

const emits = defineEmits(['remove', 'updateSection', 'updateLength'])

const section = ref(props.initialSection)

const length = ref(props.initialLength)

const options = ref(cableTypes)

watchEffect(() => {
  section.value = props.initialSection
  length.value = props.initialLength
})

watch(section, (newValue) => {
  emits('updateSection', props.id, newValue)
})

watch(length, (newValue) => {
  emits('updateLength', props.id, newValue)
})
</script>

<template>
  <div class="cable-line">
    <div class="cable-line__info">
      <select class="cable-line__select" v-model.number="section">
        <option disabled :value="0">Выберите кабель</option>
        <option v-for="(option, id) in options" :key="id" :value="option.crossSection">
          {{ option.name + ' ' + '(сечение' + ' ' + option.crossSection + ' мм)' }}
        </option>
      </select>
      <label class="cable-line__label">
        <span>Длина линии</span>
        <input type="number" min="0" class="cable-line__input" v-model.number="length" />
        <span>м.</span>
      </label>
    </div>
    <button @click="emits('remove')" class="btn cable-line__btn">
      <img :src="removeIcon" alt="removeIcon" />
    </button>
  </div>
</template>

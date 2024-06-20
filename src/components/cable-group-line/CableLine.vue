<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import cableTypes from '@/data/lists/cableTypes.json'
import { ref, watch } from 'vue'

const props = defineProps({
  id: Number,
  initialSection: Number
})

const emits = defineEmits(['remove', 'updateSection'])

const section = ref(props.initialSection)

const options = ref(cableTypes)

watch(section, (newValue) => {
  emits('updateSection', props.id, newValue)
})

const removeLine = () => {
  emits('remove')
}
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
        <input type="number" min="0" class="cable-line__input" @change="" />
        <span>м.</span>
      </label>
    </div>
    <button @click="removeLine" class="btn cable-line__btn">
      <img :src="removeIcon" alt="removeIcon" />
    </button>
  </div>
</template>

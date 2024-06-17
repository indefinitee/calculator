<script setup>
import { ref, watch } from 'vue'
import removeIcon from '../../assets/icons/removeicon.svg'

const props = defineProps({
  id: Number,
  initialSection: Number
})

const emits = defineEmits(['remove', 'updateTotal'])

const section = ref(props.initialSection)

const options = ref([
  { text: 'Кабель 1 (сечение 31мм)', value: 31 },
  { text: 'Кабель 2 (сечение 16мм)', value: 16 },
  { text: 'Кабель 3 (сечение 3мм)', value: 3 },
  { text: 'Кабель 4 (сечение 12мм)', value: 12 }
])

watch(section, (newValue) => {
  emits('updateTotal', props.id, newValue)
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
        <option v-for="option in options" :value="option.value">
          {{ option.text }}
        </option>
      </select>
      <label class="cable-line__label">
        <span>Длина линии</span>
        <input type="number" min="0" class="cable-line__input" />
        <span>м.</span>
      </label>
    </div>
    <button @click="removeLine" class="btn cable-line__btn">
      <img :src="removeIcon" alt="removeIcon" />
    </button>
  </div>
</template>

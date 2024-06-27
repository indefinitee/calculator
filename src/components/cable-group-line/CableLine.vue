<script setup>
import removeIcon from '@/assets/icons/removeicon.svg'
import cableTypes from '@/data/lists/cableTypes.json'
import debounce from 'lodash.debounce'
import { useToast } from 'primevue/usetoast'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  id: Number,
  initialSection: Number,
  initialLength: Number
})

const toast = useToast()

const emits = defineEmits(['remove', 'updateSection', 'updateLength'])

const section = ref(props.initialSection)

const length = ref(props.initialLength)

watchEffect(() => {
  length.value = props.initialLength
  section.value = props.initialSection
})

const options = ref(cableTypes)

const handleInputChange = debounce(() => {
  if (typeof length.value !== 'number' || length.value < 0) {
    length.value = 0

    toast.add({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'Некорректная длина линии',
      life: 1500
    })
  }

  emits('updateLength', props.id, length.value)
}, 500)

const handleSelectChange = () => {
  emits('updateSection', props.id, section.value)
}
</script>

<template>
  <div class="cable-line">
    <div class="cable-line__info">
      <div class="cable-line__select-wrapper">
        <select class="cable-line__select" v-model.number="section" @change="handleSelectChange">
          <option disabled :value="0">Выберите кабель</option>
          <option v-for="(option, id) in options" :key="id" :value="option.crossSection">
            {{ option.name + ' ' + '(сечение' + ' ' + option.crossSection + ' мм)' }}
          </option>
        </select>
      </div>
      <label class="cable-line__label">
        <span>Длина линии</span>
        <input
          type="number"
          min="0"
          step="1"
          pattern="[0-9]*"
          class="cable-line__input"
          v-model.number="length"
          :disabled="section === 0"
          @input="handleInputChange"
        />
        <span>м.</span>
      </label>
    </div>
    <button @click="emits('remove')" class="btn cable-line__btn">
      <img :src="removeIcon" alt="removeIcon" />
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import addIcon from '../../assets/icons/addicon.svg'
import CableLine from '../cable-group-line/CableLine.vue'

const props = defineProps({
  title: String
})

const emits = defineEmits(['removeGroup'])

const initialSectionValue = 0

const lines = ref([{ id: 1, section: initialSectionValue }])

let nextId = 2

const addLine = () => {
  lines.value.push({ id: nextId++, section: initialSectionValue })
}

const removeLine = (id) => {
  lines.value = lines.value.filter((line) => line.id !== id)

  if (lines.value.length === 0) {
    emits('removeGroup')
  }
}

const updateSection = (id, section) => {
  const line = lines.value.find((line) => line.id === id)
  if (line) line.section = section
}

const totalSection = computed(() => {
  const total = lines.value.reduce((total, line) => total + line.section, 0)
  return total > 0 ? total : 0
})
</script>

<template>
  <div class="cable-group relative">
    <div class="cable-group__header absolute relative">
      <span class="cable-group__header-text">{{ props?.title }}</span>
    </div>

    <div class="cable-group__content">
      <div class="cable-group__add">
        <p>Добавить кабель</p>
        <button @click="addLine" class="btn cable-group__btn">
          <img :src="addIcon" alt="addIcon" class="cable-group__icon" />
        </button>
      </div>
      <p class="cable-group__subtitle">
        Суммарное сечение <span>{{ totalSection }} ММ</span>
      </p>
    </div>

    <TransitionGroup class="cable-group__list" name="cable-list" tag="div">
      <CableLine
        v-for="line in lines"
        :id="line.id"
        :key="line.id"
        :initialSection="line.section"
        @remove="removeLine(line.id)"
        @updateTotal="updateSection"
      />
    </TransitionGroup>
  </div>
</template>

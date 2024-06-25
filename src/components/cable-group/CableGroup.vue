<script setup>
import addIcon from '@/assets/icons/addicon.svg'
import CableLine from '@/components/cable-group-line/CableLine.vue'
import { useCalcStore } from '@/stores/calc'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'

const props = defineProps({
  calcId: Number,
  groupId: Number,
  title: String,
  selectedOkl: [String, Object]
})

const emits = defineEmits(['removeGroup'])

const calcStore = useCalcStore()

const initialCrossSection = 0

const calc = computed(() => calcStore.calculator.get(props.calcId))

const group = computed(() => calc.value.groups.find((group) => group.id === props.groupId))

const groupElements = computed({
  get: () => group.value.elements,
  set: (value) => {
    group.value.elements = value
  }
})

const nextId = computed(() => {
  if (groupElements.value.length === 0) {
    return 1
  }
  return groupElements.value[groupElements.value.length - 1].id + 1
})

const toast = useToast()

const addLine = () => {
  if (!props.selectedOkl) {
    return toast.add({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'Не выбран тип ОКЛ в линии',
      life: 1000
    })
  }
  groupElements.value.push({ id: nextId.value, section: initialCrossSection, length: 0 })
}

const removeLine = (id) => {
  groupElements.value = groupElements.value.filter((line) => line.id !== id)

  if (groupElements.value.length === 0) {
    emits('removeGroup')
  }
}

const updateSection = (id, section) => {
  const line = groupElements.value.find((line) => line.id === id)
  if (line) line.section = section
}

const updateLength = (id, length) => {
  if (!length) return

  const line = groupElements.value.find((line) => line.id === id)

  if (line) line.length = length
}

watch(groupElements, () => {
  groupElements.value = group.value.elements
})

const totalSection = computed(() => {
  return groupElements.value.reduce((total, line) => total + line.section, 0)
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
        v-for="line in groupElements"
        :id="line.id"
        :key="line.id"
        :initialSection="line.section"
        :initialLength="line.length"
        @remove="removeLine(line.id)"
        @updateSection="updateSection"
        @updateLength="updateLength"
      />
    </TransitionGroup>
  </div>
</template>

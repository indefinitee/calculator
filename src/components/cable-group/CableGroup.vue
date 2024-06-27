<script setup>
import addIcon from '@/assets/icons/addicon.svg'
import CableLine from '@/components/cable-group-line/CableLine.vue'
import { useToast } from 'primevue/usetoast'
import { computed, watch } from 'vue'
import { useCalcStore } from '@/stores/calc'

const props = defineProps({
  calcData: Object,
  calcId: Number,
  groupId: Number,
  title: String
})

const calcStore = useCalcStore()

const emits = defineEmits(['removeGroup', 'updateResults'])

const toast = useToast()

const initialCrossSection = 0

const group = computed(() => props.calcData.groups.find((group) => group.id === props.groupId))

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

const addLine = () => {
  if (!props.calcData.selectedOkl || !props.calcData.selectedMontage) {
    return toast.add({
      severity: 'warn',
      summary: 'Предупреждение',
      detail: 'Выбраны не все параметры в линии',
      life: 1000
    })
  }
  groupElements.value.push({ id: nextId.value, section: initialCrossSection, length: 0 })
}

const removeGroupLine = (id) => {
  const index = groupElements.value.findIndex((item) => item.id === id)

  groupElements.value.splice(index, 1)

  if (props.calcData.isCalculated) emits('updateResults')

  if (groupElements.value.length === 0) {
    emits('removeGroup')
  }
}

const updateSection = (id, section) => {
  const line = groupElements.value.find((line) => line.id === id)
  if (line) line.section = section
}

const updateLength = (id, length) => {
  const line = groupElements.value.find((line) => line.id === id)

  if (line) line.length = length

  emits('updateResults')
}

watch(
  () => groupElements.value,
  () => {
    calcStore.updateGroupTotals(props.calcId, props.groupId)
  },
  { deep: true }
)
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
        Суммарное сечение <span>{{ group.totalSection }} ММ</span>
      </p>
    </div>

    <TransitionGroup class="cable-group__list" name="cable-list" tag="div">
      <CableLine
        v-for="line in groupElements"
        :id="line.id"
        :key="line.id"
        :initialSection="line.section"
        :initialLength="line.length"
        @remove="removeGroupLine(line.id)"
        @updateSection="updateSection"
        @updateLength="updateLength"
      />
    </TransitionGroup>
  </div>
</template>

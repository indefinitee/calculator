<script setup>
import Calc from './components/calc-section/Calc.vue'
import Header from './components/header/Header.vue'
import ResultSidebar from './components/result-sidebar/ResultSidebar.vue'

import { useCalcStore } from '@/stores/calc'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isLoading = ref(false)

const calcContainer = ref(null)

const calcStore = useCalcStore()

const updateLoading = (value) => {
  isLoading.value = value
}

const handleBeforeUnload = () => {
  calcStore.saveCalcToLocalStorage()
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <div class="container">
    <Header :calcContainer="calcContainer" />
    <div class="wrapper relative">
      <div v-if="!isLoading" ref="calcContainer" class="flex flex-col gap-4 pd-40 relative">
        <TransitionGroup name="list">
          <Calc
            v-for="[key] in calcStore.calculator"
            :key="key"
            :id="key"
            :title="'Линия #' + key"
          />
        </TransitionGroup>
      </div>

      <app-progress v-else class="spinner" />

      <ResultSidebar :updateLoading="updateLoading" />
    </div>
    <div class="mobile-btn">
      <app-scroll-top icon="pi pi-arrow-up"></app-scroll-top>
    </div>
    <app-toast z-index="999"></app-toast>
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>

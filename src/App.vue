<script setup>
import Calc from './components/calc-section/Calc.vue'
import Header from './components/header/Header.vue'
import ResultSidebar from './components/result-sidebar/ResultSidebar.vue'

import { useCalcStore } from '@/stores/calc'
import { ref } from 'vue'

const isLoading = ref(false)

const calcContainer = ref(null)

const calcStore = useCalcStore()

const updateLoading = (value) => {
  isLoading.value = value
}
</script>

<template>
  <div class="container">
    <Header :calcContainer="calcContainer" />
    <div class="wrapper relative">
      <div v-if="!isLoading" ref="calcContainer" class="flex flex-col gap-4 min-w-800 relative">
        <TransitionGroup name="list" tag="div">
          <Calc
            v-for="item in calcStore.calculator"
            :key="item.id"
            :id="item.id"
            :title="'Линия #' + item.id"
          />
        </TransitionGroup>
      </div>

      <app-progress v-else class="spinner" />

      <ResultSidebar :updateLoading="updateLoading" />
    </div>
    <div class="mobile-btn">
      <app-scroll-top icon="pi pi-arrow-up"></app-scroll-top>
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>

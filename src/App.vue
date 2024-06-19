<script setup>
import Calc from './components/calc-section/Calc.vue'
import Header from './components/header/Header.vue'
import ResultSidebar from './components/result-sidebar/ResultSidebar.vue'

import { useCalcStore } from '@/stores/calc'
import { ref } from 'vue'

const calcContainer = ref(null)
const calcStore = useCalcStore()
</script>

<template>
  <div class="container">
    <Header :calcContainer="calcContainer" />
    <div class="wrapper relative">
      <div ref="calcContainer" class="flex flex-col gap-4 min-w-800 relative">
        <Calc
          v-for="item in calcStore.calculator"
          :key="item.id"
          :id="item.id"
          :title="'Линия #' + item.id"
        />
      </div>
      <ResultSidebar />
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>

<script setup>
import Calc from './components/calc-section/Calc.vue'
import Header from './components/header/Header.vue'
import ResultSidebar from './components/result-sidebar/ResultSidebar.vue'

import { useCalcStore } from '@/stores/calc'

const calcStore = useCalcStore()
</script>

<template>
  <div class="container">
    <Header @clearAll="calcStore.clearCalc(calcStore.calculator)" />
    <div class="wrapper relative">
      <div class="flex flex-col gap-4 min-w-800 relative">
        <Calc
          v-for="item in calcStore.calculator"
          :key="item.id"
          :id="item.id"
          :title="'Линия #' + item.id"
          @removeCalculator="calcStore.removeCalc(item.id)"
        />
      </div>
      <ResultSidebar />
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/index.scss';
</style>

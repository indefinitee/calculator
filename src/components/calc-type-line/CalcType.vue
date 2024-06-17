<script setup>
import TypeRadio from '../type-radio/TypeRadio.vue'

defineProps({
  title: String,
  radioButtons: Array,
  radioName: String,
  typeClass: String
})
</script>

<template>
  <div class="flex">
    <div class="calc-type__header">
      <h3 class="calc-type__title">{{ title }}</h3>
    </div>
    <ul class="calc-type" :class="typeClass">
      <TypeRadio
        v-for="(item, index) in radioButtons"
        :key="index"
        :name="item"
        :radioName="radioName"
      />
    </ul>
  </div>
</template>

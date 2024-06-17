<script setup>
defineProps({
  name: String,
  radioName: String
})
</script>

<template>
  <li class="calc-type-item">
    <label class="calc-type-label"
      ><input :name="radioName" type="radio" class="calc-type-input" /><span
        class="calc-type-text"
        >{{ name }}</span
      ></label
    >
  </li>
</template>

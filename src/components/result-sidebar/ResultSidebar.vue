<script setup>
import { useCalcStore } from '@/stores/calc'
import { loadCfg, saveCfg } from '@/utils/cfgActions'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

const toast = useToast()

const calcStore = useCalcStore()

const fileInput = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  if (!file) {
    return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Файл не выбран', life: 3000 })
  }

  const data = await loadCfg(file)

  const jsonData = JSON.parse(data)

  calcStore.updateCalc(jsonData)

  return toast.add({ severity: 'success', summary: 'Успех', detail: 'Файл загружен', life: 3000 })
}

const handleFileDownload = (target) => {
  saveCfg(calcStore.calculator, target)

  toast.add({ severity: 'success', summary: 'Успех', detail: 'Файл сохранен', life: 3000 })
}

const alertFunc = () => {
  alert('Пока ничего не происходит')
}
</script>

<template>
  <aside class="sidebar">
    <div>
      <h2 class="sidebar__title">Итого</h2>
    </div>

    <div class="sidebar__container">
      <!--
      <div class="sidebar__info">
        <p class="sidebar__subtitle">Если ДМОУ-1К/2К/1К-М</p>
        <p class="sidebar__subtitle">Кол-во дюбелей = <span class="sidebar__value">2X*3</span></p>
        <p class="sidebar__subtitle">Кол-во саморезов = <span class="sidebar__value">2X*3</span></p>
      </div>
      <div class="sidebar__info">
        <p class="sidebar__subtitle">Если ДМОУ-С</p>
        <p class="sidebar__subtitle">Кол-во дюбелей = <span class="sidebar__value">X*3</span></p>
        <p class="sidebar__subtitle">Кол-во саморезов = <span class="sidebar__value">X*3</span></p>
        <p class="sidebar__subtitle">Кол-во кабеля = <span class="sidebar__value">X</span></p>
      </div>
      -->
      <div class="sidebar__info">
        <p class="sidebar__subtitle">Добавьте кабель</p>
      </div>
    </div>

    <div class="sidebar__buttons">
      <div class="sidebar__buttons-bottom">
        <a @click="handleFileDownload($event.target)" class="btn sidebar__btn sidebar__btn--save"
          >Сохранить</a
        >
        <button @click="fileInput.click()" class="btn sidebar__btn sidebar__btn--load">
          Загрузить
        </button>
      </div>
      <button @click="alertFunc" class="btn sidebar__btn sidebar__btn--print">Создать PDF</button>
    </div>
    <input type="file" class="hidden" accept=".json" ref="fileInput" @change="handleFileUpload" />
  </aside>
</template>

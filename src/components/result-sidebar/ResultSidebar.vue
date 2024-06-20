<script setup>
import { useCalcStore } from '@/stores/calc'
import { createHeaders, createPdf, generateData, loadCfg, saveCfg } from '@/utils/cfgActions'
import { jsPDF } from 'jspdf'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

const props = defineProps({
  updateLoading: Function
})

const toast = useToast()

const calcStore = useCalcStore()

const results = computed(() => calcStore.results)

const fileInput = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  if (!file) {
    return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Файл не выбран', life: 3000 })
  }

  props.updateLoading(true)

  try {
    const data = await loadCfg(file)

    const jsonData = JSON.parse(data)

    calcStore.updateCalc(jsonData)

    toast.add({
      severity: 'success',
      summary: 'Успех',
      detail: 'Конфигурация загружена',
      life: 3000
    })
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось загрузить файл',
      life: 3000
    })
  } finally {
    props.updateLoading(false)
    fileInput.value.value = null
  }
}

const handlePdfCreate = () => {
  const doc = new jsPDF()
  doc.setFontSize(10)

  const headers = createHeaders(['id', 'type_okl', 'type_montage', 'cabels', 'result'])

  doc.table(
    1,
    2,
    generateData(40, {
      type_okl: '123',
      type_montage: '12 3456',
      cabels: '2X*3',
      result: '2X*3'
    }),
    headers
  )
  doc.save('a4.pdf')
}
</script>

<template>
  <aside class="sidebar">
    <div>
      <h2 class="sidebar__title">Итого</h2>
    </div>

    <div class="sidebar__container">
      <div v-if="!results.length" class="sidebar__info">
        <p class="sidebar__subtitle">Для получения результатов начните расчет</p>
      </div>
      <div v-else class="sidebar__info">
        <p class="sidebar__subtitle">Если ДМОУ-1К/2К/1К-М</p>
        <p class="sidebar__subtitle">Кол-во дюбелей = <span class="sidebar__value">2X*3</span></p>
        <p class="sidebar__subtitle">Кол-во саморезов = <span class="sidebar__value">2X*3</span></p>
      </div>
    </div>

    <div class="sidebar__buttons">
      <div class="sidebar__buttons-bottom">
        <a
          @click="saveCfg(calcStore.calculator, $event.target)"
          class="btn sidebar__btn sidebar__btn--save"
          >Сохранить</a
        >
        <button @click="fileInput.click()" class="btn sidebar__btn sidebar__btn--load">
          Загрузить
        </button>
      </div>
      <button @click="handlePdfCreate" class="btn sidebar__btn sidebar__btn--print">
        Создать PDF
      </button>
    </div>
    <input type="file" class="hidden" accept=".json" ref="fileInput" @change="handleFileUpload" />
  </aside>
</template>

<script setup>
import '@/assets/fonts/TimesNewRoman-normal'

import { useCalcStore } from '@/stores/calc'
import { exampleData, loadCfg, saveCfg } from '@/utils/cfgActions'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

const props = defineProps({
  updateLoading: Function
})

const toast = useToast()

const calcStore = useCalcStore()

const results = computed(() => {
  const allResults = []
  calcStore.calculator.forEach((calc, id) => {
    if (calc.results && Object.keys(calc.results).length > 0) {
      allResults.push({ id, results: calc.results })
    }
  })
  return allResults
})

const fileInput = ref(null)

const handleFileUpload = async (event) => {
  const file = event.target.files[0]

  if (!file) {
    return toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Файл не выбран', life: 3000 })
  }

  props.updateLoading(true)

  try {
    const data = await loadCfg(file)

    const jsonData = new Map(JSON.parse(data))

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

const handlePdfCreate = (data) => {
  const doc = new jsPDF()
  const timeDate = new Date()

  doc.setFont('TimesNewRoman')

  doc.autoTable({
    startY: 30,
    theme: 'grid',
    head: [
      [
        { content: '', colSpan: 1 },
        { content: 'ПожТехКабель РТК-Line', colSpan: 1 },
        { content: 'E-mail: support@layta.ru', colSpan: 2 }
      ],
      [
        { content: '', colSpan: 1 },
        { content: 'Комплектность', colSpan: 1 },
        { content: 'Тел.: 8 800 775 30 00', colSpan: 2 }
      ],
      ['№', 'Наименование', 'Ед. изм.', 'Кол-во']
    ],
    body: data.map((row, index) => [index + 1, row.name, row.unit, row.quantity]),
    didDrawCell: () => {
      doc.setFont('TimesNewRoman')
    },
    styles: {
      font: 'TimesNewRoman',
      fontSize: 10
    },
    headStyles: {
      font: 'TimesNewRoman',
      fontSize: 12,
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0]
    },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.5
  })

  doc.save(`ПожТехКабель. Итоговый расчет от ${timeDate.toLocaleDateString()}.pdf`)
}
</script>

<template>
  <aside class="sidebar">
    <div>
      <h2 class="sidebar__title">Итого</h2>
    </div>

    <div class="sidebar__container">
      <template v-if="!results.length">
        <div class="sidebar__info">
          <p class="sidebar__subtitle">
            Автоматический расчет начнется после указания всех соответствующих характеристик
          </p>
        </div>
      </template>
      <template v-else>
        <div v-for="{ id, results } in results" :key="id" class="sidebar__info">
          <p class="sidebar__subtitle">Для линии #{{ id }}</p>
          <p v-for="(result, key) in results" :key="key" class="sidebar__subtitle">
            {{ key }}:<span class="sidebar__value">{{ result }}</span>
          </p>
        </div>
      </template>
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
      <button @click="handlePdfCreate(exampleData)" class="btn sidebar__btn sidebar__btn--print">
        Создать PDF
      </button>
    </div>
    <input type="file" class="hidden" accept=".json" ref="fileInput" @change="handleFileUpload" />
  </aside>
</template>

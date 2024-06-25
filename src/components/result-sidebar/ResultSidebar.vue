<script setup>
import '@/assets/fonts/TimesNewRoman-normal'
import { useCalcStore } from '@/stores/calc'
import { loadCfg, saveCfg } from '@/utils/cfgActions'
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

// Пример данных
const exampleData = [
  { name: 'КПСнг(А)-FRLS 1x2x0,75 (200м) ЭНТЭ', unit: 'м', quantity: 1000 },
  {
    name: 'Труба гофр. тяжелая самозатух. ТГТ СЗ ПВХ 16 мм с зондом (100 м) ПожТехКабель (710-001)',
    unit: 'м',
    quantity: 1000
  },
  {
    name: 'Скоба металлическая однолапковая 16-17 мм (100 шт/уп) ПожТехКабель PTK-Accessories (850-004)',
    unit: 'м',
    quantity: 3000
  },
  {
    name: 'Саморез 3,5x35 мм (1000 шт/уп) ПожТехКабель PTK-Accessories (860-005)',
    unit: 'шт',
    quantity: 3000
  },
  {
    name: 'Дюбель металлический 5х30мм (500 шт/уп) ПожТехКабель PTK-Accessories (861-005)',
    unit: 'шт',
    quantity: 3000
  }
]

const handlePdfCreate = (data) => {
  const doc = new jsPDF()

  doc.setFont('TimesNewRoman')

  // Title
  doc.setFontSize(18)
  doc.text('Пожтехкабель PTK-Line', 10, 10)

  // Subtitle
  doc.setFontSize(14)
  doc.text('Комплектность', 10, 20)

  // Table
  const startX = 10
  const startY = 30
  const cellHeight = 10

  // Headers
  doc.setFontSize(12)
  doc.text('№', startX, startY)
  doc.text('Наименование', startX + 20, startY)
  doc.text('Ед. Изм.', startX + 120, startY)
  doc.text('Кол-во', startX + 150, startY)

  // Table data
  data.forEach((row, index) => {
    const y = startY + (index + 1) * cellHeight
    doc.text(String(index + 1), startX, y)
    doc.text(row.name, startX + 20, y)
    doc.text(row.unit, startX + 120, y)
    doc.text(String(row.quantity), startX + 150, y)
  })

  // Contact info
  const contactY = startY + (data.length + 1) * cellHeight + 10
  doc.text('E-mail: support@layta.ru', startX, contactY)
  doc.text('Тел.: 8 (800) 775-30-00', startX, contactY + 10)

  doc.save('output.pdf')
}
</script>

<template>
  <aside class="sidebar">
    <div>
      <h2 class="sidebar__title">Итого</h2>
    </div>

    <div class="sidebar__container">
      <div v-if="!results.length" class="sidebar__info">
        <p class="sidebar__subtitle">
          Автоматический расчет начнется после указания всех соответствующих характеристик
        </p>
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
      <button @click="handlePdfCreate(exampleData)" class="btn sidebar__btn sidebar__btn--print">
        Создать PDF
      </button>
    </div>
    <input type="file" class="hidden" accept=".json" ref="fileInput" @change="handleFileUpload" />
  </aside>
</template>

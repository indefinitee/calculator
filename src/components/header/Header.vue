<script setup>
import { useCalcStore } from '@/stores/calc'
import { scrollToDown } from '@/utils/scroll'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { nextTick } from 'vue'

const toast = useToast()

const calcStore = useCalcStore()

const confirm = useConfirm()

const props = defineProps({
  calcContainer: HTMLDivElement
})

const showConfirm = () => {
  if (calcStore.calcLength) {
    confirm.require({
      message: 'Вы действительно хотите создать новый расчет?',
      header: 'Подтверждение',
      rejectLabel: 'Отмена',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Новый расчет',
      rejectClass: 'p-button-secondary p-button-outlined',
      acceptClass: 'p-button-danger',
      accept: () => {
        window.scrollTo(0, 0)
        setTimeout(calcStore.clearCalc, 1000)
        toast.add({
          severity: 'info',
          summary: 'Информация',
          detail: 'Выполнен сброс',
          life: 2000
        })
      }
    })
  } else {
    window.scrollTo(0, 0)
    setTimeout(calcStore.clearCalc, 1000)
    toast.add({
      severity: 'info',
      summary: 'Информация',
      detail: 'Выполнен сброс',
      life: 2000
    })
  }
}

const addNewCalc = async () => {
  calcStore.addCalc()

  await nextTick()

  scrollToDown(props.calcContainer)
}
</script>

<template>
  <header class="header">
    <app-dialog></app-dialog>
    <div class="container">
      <h1 class="header__title">Пожтехкабель</h1>
      <div class="header__buttons">
        <button @click="addNewCalc" class="btn header__btn header__btn--line">Новая линия</button>
        <button @click="showConfirm" class="btn header__btn header__btn--calc">Новый расчет</button>
      </div>
    </div>
  </header>
</template>

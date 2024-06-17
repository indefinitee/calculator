<script setup>
import { useCalcStore } from '@/stores/calc'
import { useConfirm } from 'primevue/useconfirm'

const calcStore = useCalcStore()

const confirm = useConfirm()

const showConfirm = () => {
  if (calcStore.calculator) {
    confirm.require({
      message: 'Вы действительно хотите создать новый расчет?',
      header: 'Подтверждение',
      rejectLabel: 'Отмена',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Новый расчет',
      rejectClass: 'p-button-secondary p-button-outlined',
      acceptClass: 'p-button-danger',
      accept: () => {
        calcStore.clearCalc()
      }
    })
  } else {
    calcStore.clearCalc()
  }
}
</script>

<template>
  <header class="header">
    <app-dialog></app-dialog>
    <div class="container">
      <h1 class="header__title">Пожтехкабель</h1>
      <div class="header__buttons">
        <button @click="calcStore.addCalc" class="btn header__btn header__btn--line">
          Новая линия
        </button>
        <button @click="showConfirm" class="btn header__btn header__btn--calc">Новый расчет</button>
      </div>
    </div>
  </header>
</template>

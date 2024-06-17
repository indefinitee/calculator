<script setup>
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
      <button @click="alertFunc" class="btn sidebar__btn sidebar__btn--print">Печать</button>
      <button @click="alertFunc" class="btn sidebar__btn sidebar__btn--save">Сохранить</button>
      <button @click="alertFunc" class="btn sidebar__btn sidebar__btn--load">Загрузить</button>
    </div>
  </aside>
</template>

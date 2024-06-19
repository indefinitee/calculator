import '@/assets/main.css'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ProgressSpinner from 'primevue/progressspinner'
import ScrollTop from 'primevue/scrolltop'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import App from '@/App.vue'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)

app.use(ConfirmationService)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '[data-theme="light"]'
    }
  }
})

app.use(createPinia())

app.component('app-dialog', ConfirmDialog)
app.component('app-progress', ProgressSpinner)
app.component('app-toast', Toast)
app.component('app-scroll-top', ScrollTop)

app.mount('#app')

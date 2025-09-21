import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';

const app = createApp(App)
const pinia = createPinia()

app.use(ToastService);
app.use(ConfirmationService);

app.use(pinia)
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
});

app.component('Toast', Toast);
library.add(faPlus, faEdit, faTrash, faSave)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
export { pinia }
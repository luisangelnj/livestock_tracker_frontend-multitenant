import "vue-toastification/dist/index.css";
import 'vue-loading-overlay/dist/css/index.css';
import './assets/css/satoshi.css'
import './assets/css/style.css'
import 'jsvectormap/dist/css/jsvectormap.min.css'
import 'flatpickr/dist/flatpickr.min.css'

import { LoadingPlugin } from 'vue-loading-overlay';
import Toast from "vue-toastification";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from 'vue3-apexcharts'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Toast, {
    pauseOnHover: false,
})
app.use(createPinia())
app.use(router)
app.use(LoadingPlugin);
app.use(VueApexCharts)

app.mount('#app')

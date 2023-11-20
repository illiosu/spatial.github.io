import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)

app.mount('#app')

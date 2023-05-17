import './assets/main.pcss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.config.compilerOptions.whitespace = 'preserve'

app.use(createPinia())

app.mount('#app')
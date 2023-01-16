import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "quasar/dist/quasar.sass"
import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions)
app.use(createPinia())
.use(router)


app.mount('#app')
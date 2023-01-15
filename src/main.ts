import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "quasar/dist/quasar.sass"
import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_,
    appId: import.meta.env.VITE_API_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  };
  initializeApp(firebaseConfig);*/
const app = createApp(App).use(Quasar, quasarUserOptions)
//const auth = getAuth(initializeApp(firebaseConfig))
app.use(createPinia())
.use(router)


app.mount('#app')
//export default auth
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/app.css'
// import LeaderLine from 'leader-line'

createApp(App).use(store).use(router).mount('#app')

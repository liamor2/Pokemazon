import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import HomePage from './pages/HomePage.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})
   
const app = createApp(App)

app.use(router)
app.mount('#app')
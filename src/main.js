import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

import PokemonListPage from './pages/PokemonListPage.vue'


const routes = [
    {
        path: '/',
        name: 'PokemonList',
        component: PokemonListPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})
   
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
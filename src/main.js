import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

import PokemonListPage from './pages/PokemonListPage.vue'
import PokemonDetailsPage from './pages/PokemonDetailsPage.vue'


const routes = [
    {
        path: '/',
        name: 'PokemonList',
        component: PokemonListPage
    },
    {
        path: '/pokemon/:name',
        name: 'PokemonDetails',
        component: PokemonDetailsPage,
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/'
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, 
})
   
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
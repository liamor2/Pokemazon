import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'

import PokemonListPage from './pages/PokemonListPage.vue'
import PokemonDetailsPage from './pages/PokemonDetailsPage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'
import AccountPage from './pages/AccountPage.vue'
import AboutPage from './pages/AboutPage.vue'
import ContactPage from './pages/ContactPage.vue'
import CartPage from './pages/CartPage.vue'
import Page404 from './pages/404Page.vue'


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
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage
    },
    {
        path: '/account',
        name: 'Account',
        component: AccountPage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactPage
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartPage
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: Page404
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
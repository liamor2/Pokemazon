<template>
    <headerComponent/>
    <main>
        <h1>Cart</h1>
        <div v-if="cart.length === 0">
            <p>Your cart is empty</p>
        </div>
        <div v-else-if="!checkout">
            <table>
                <thead>
                    <tr>
                        <th>Pokemon</th>
                        <th>Image</th>
                        <th>Level</th>
                        <th>Color</th>
                        <th>Training</th>
                        <th>Form</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart" :key="item.id">
                        <td>{{ sanitizeString(item.name) }}</td>
                        <td><img :src="item.image" alt="pokemon" /></td>
                        <td>{{ item.level }}</td>
                        <td>{{ item.color }}</td>
                        <td>{{ item.training }}</td>
                        <td>{{ item.form }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }} ₽</td>
                        <td><button @click="removeItem(item.id)">Remove</button></td>
                    </tr>
                </tbody>
            </table>
            <p>Total: {{ total }} ₽</p>
            <button @click="handleCheckout">Checkout</button>
        </div>
    </main>
    <footerComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'

import { useServerGestion}  from '../script/server-gestion.js'

const loggedIn = ref(localStorage.getItem('loggedIn') || false)
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])
const total = ref(0)
const checkout = ref(false)

const serverGestion = useServerGestion()

const removeItem = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(cart.value))
}

const handleCheckout = () => {
    try {
        serverGestion.checkout(cart.value)
        cart.value = []
        localStorage.setItem('cart', JSON.stringify(cart.value))
        checkout.value = true
    } catch (error) {
        console.error(error)
    }
}

const sanitizeString = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

onMounted(() => {
    total.value = cart.value.reduce((acc, item) => acc + item.price, 0)
})
</script>

<style lang="scss" scoped>
main {
    text-align: center;
    margin: 100px 10%;
    width: 80%;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px #000000a2;

    table {
        width: 100%;
        border-collapse: collapse;

        thead {
            background-color: #e0e0e0;
        }

        th, td {
            padding: 10px;
            border: 1px solid #000;
        }

        img {
            width: 50px;
            height: 50px;
        }
    }
}
</style>
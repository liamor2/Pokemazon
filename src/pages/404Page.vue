<template>
    <headerComponent/>
    <div>
        <img src="../assets/Error404.png" alt="Error 404" />
        <h1>404 Page Not Found</h1>
        <p>Oops! This is not the page you're looking for.</p>
    </div>
    <footerComponent />
</template>

<script setup>
import { ref } from 'vue'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'

const loggedIn = ref(localStorage.getItem('loggedIn') || false)
</script>

<style scoped>

div {
    text-align: center;
    margin-top: 100px;
}

h1 {
    font-size: 36px;
    color: #cacaca;
}

p {
    font-size: 18px;
    color: #868686;
}
</style>
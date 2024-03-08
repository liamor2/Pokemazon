<template>
    <headerComponent/>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
        <span v-if="loginError">{{ loginError }}</span>
        <p>Don't have an account? <a href="#/register">Register</a></p>
    </div>
    <footerComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import headerComponent from '../components/header.vue';
import footerComponent from '../components/footer.vue';

import { useServerGestion } from '../script/server-gestion.js';

const serverGestion = useServerGestion();
const username = ref('');
const password = ref('');
const loginError = ref('');

onMounted(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = '/';
    }
});

async function login() {
    if (username.value === '' || password.value === '') {
        loginError.value = 'All fields are required';
        return;
    }
    console.log(username.value, password.value);
    const response = await serverGestion.loginUser(username.value, password.value);
    console.log(response);
    if (response !== 'Logged in') {
        loginError.value = response;
        return;
    }
    localStorage.setItem('loggedIn', true);
    window.location.href = '/';
}
</script>

<style lang="scss" scoped>
div {
    text-align: center;
    margin: 100px 35%;
    width: 30%;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px #000000a2;

    h1 {
        font-size: 36px;
        color: #6F6F6F;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        
        label {
            font-size: 1.5rem;
        }

        input {
            padding: 0.5rem;
            border-radius: 5px;
            border: none;
            box-shadow: 0 0 5px #000000a2;
        }

        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 5px;
            background-color: #e0e0e0;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 1rem;
            font-weight: bold;
            color: #000;
            text-transform: uppercase;
            outline: none;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        }

        p {
            margin-top: 20px;
            font-size: 1.5rem;
            a {
                text-decoration: none;
                color: #000;
            }
        }
    }
}
</style>
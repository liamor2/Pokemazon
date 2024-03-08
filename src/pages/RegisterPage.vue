<template>
    <headerComponent/>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="username" required>
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
            <label for="confirmEmail">Confirm Email</label>
            <input type="email" id="confirmEmail" v-model="confirmEmail" required>
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" required>
            <button type="submit">Register</button>
        </form>
        <span v-if="registerError">{{ registerError }}</span>
        <p>Already have an account? <a href="#/login">Login</a></p>
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
const confirmPassword = ref('');
const email = ref('');
const confirmEmail = ref('');
const registerError = ref('');

onMounted(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
        window.location.href = '/';
    }
});

async function register() {
    if (username.value === '' || email.value === '' || confirmEmail.value === '' || password.value === '' || confirmPassword.value === '') {
        registerError.value = 'All fields are required';
        return;
    }
    if (email.value === confirmEmail.value) {
        if (password.value === confirmPassword.value) {
            try {
                const response = await serverGestion.registerUser(username.value, email.value, password.value);
                if (response !== 'OK') {
                    registerError.value = response;
                    return;
                }
                window.location.href = '/#/login';
            } catch (error) {
                console.error(error);
            }
            window.location.href = '/#/login';
        } else {
            registerError.value = 'Passwords do not match';
        }
    } else {
        registerError.value = 'Emails do not match';
    }
}
</script>

<style lang="scss" scoped>
div {
    text-align: center;
    margin: 1% 35%;
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
        margin: 20px 0;
        
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

    span {
        color: red;
        font: 1.5rem sans-serif;
    }
}
</style>
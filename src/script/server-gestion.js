import { defineStore } from 'pinia'
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { cors } from 'cors'

export const useServerGestion = defineStore('serverGestion', () => {
    const state = reactive({
        user: {
            id: -1,
            username: '',
            email: '',
            role: '',
            password: '',
        },
        loading: false,
        error: null,
    });

    onMounted(async () => {
        try {
            console.log('Server Accessor Mounted')
        } catch (error) {
            console.error(error)
        }
        state.user = JSON.parse(localStorage.getItem('user')) || state.user;
    });
    
    const loginUser = async (username, password) => {
        state.loading = true;
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        };
        try {
            const response = await fetch('http://localhost:3000/login', request);
            const json = await response.json();
            if (json.message !== 'User not found') {
                state.user = json;
                localStorage.setItem('user', JSON.stringify(json));
                return json.message;
            }
            state.loading = false;
            return json;
        } catch (error) {
            console.error(error);
            state.loading = false;
        }
    };

    const registerUser = async (username, email, password) => {
        state.loading = true;
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        };
        try {
            const response = await fetch('http://localhost:3000/register', request);
            const json = await response.json();
            if (json.message !== 'Registered') {
                return json.message;
            }
            state.loading = false;
        } catch (error) {
            console.error(error);
            state.loading = false;
        }
    };

    const checkout = async (cart) => {
        state.loading = true;
        const user = state.user;
        const request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cart, user }),
        };
        try {
            const response = await fetch('http://localhost:3000/checkout', request);
            const json = await response.json();
            if (json.message !== 'Checkout successful') {
                return json.message;
            }
            state.loading = false;
        } catch (error) {
            console.error(error);
            state.loading = false;
        }
    };

    const getAllOrdersForUser = async () => {
        state.loading = true;
        const userId = state.user.id;
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(`http://localhost:3000/orders/${userId}`, request);
            const json = await response.json();
            state.loading = false;
            return json;
        } catch (error) {
            console.error(error);
            state.loading = false;
        }
    };

    const logoutUser = () => {
        state.user = {
            id: 0,
            username: '',
            email: '',
            password: '',
        };
    }

    return {
        state,
        loginUser,
        registerUser,
        logoutUser,
        getAllOrdersForUser,
        checkout,
    };
});
<template>
    <header-component/>
    <main>
        <h1>Account</h1>
        <form>
            <label for="username">Username</label>
            <input type="text" id="username" v-model="user.username">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="user.email">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="user.password">
            <label for="role">Role: {{ role }}</label>
            <button type="button" @click="update">Update</button>
            <button type="button" @click="deleteAccount">Delete Account</button>
        </form>
    </main>
    <aside>
        <h2>Orders</h2>
        <ul>
            <li v-for="order in orders" :key="order.id">
                <h3>Order N°{{ order.id }}</h3>
                <p>Products:</p>
                <ul>
                    <li v-for="product in order.product_list" :key="product.id">
                        <p>{{ product.name }} x{{ product.quantity }}</p>
                    </li>
                </ul>
                <p>Total: {{ order.price }} ₽</p>
            </li>
        </ul>
    </aside>
    <footer-component />
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import HeaderComponent from '../components/header.vue';
    import FooterComponent from '../components/footer.vue';

    import { useServerGestion } from '../script/server-gestion.js';

    const serverGestion = useServerGestion();
    const user = ref('');
    const role = ref('');
    const orders = ref('');

    onMounted(async () => {
        if (localStorage.getItem('loggedIn') !== 'true') {
            window.location.href = '/#/login';
        }

        user.value = serverGestion.state.user;

        switch (user.value.role) {
            case 0:
                role.value = 'User';
                break;
            case 1:
                role.value = 'Admin';
                break;
            default:
                role.value = 'Unknown';
                break;
        }

        orders.value = await serverGestion.getAllOrdersForUser();
        for (let i = 0; i < orders.value.length; i++) {
            orders.value[i].product_list = JSON.parse(orders.value[i].product_list);
            console.log(orders.value[i]);
        }
    });

    async function update() {
        if (user.value.username === '' || user.value.email === '' || user.value.password === '') {
            return;
        }
        const response = await serverGestion.updateUser(user.value.username, user.value.email, user.value.password);
        if (response !== 'OK') {
            return;
        }
        serverGestion.fetchUser();
    }

    async function deleteAccount() {
        const response = await serverGestion.deleteUser();
        if (response !== 'OK') {
            return;
        }
        localStorage.removeItem('loggedIn');
        window.location.href = '/#/login';
    }
</script>

<style lang="scss" scoped>
    main {
        text-align: center;
        margin: 50px 35%;
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

            label {
                font-size: 24px;
                color: #6F6F6F;
            }

            input {
                padding: 10px;
                font-size: 24px;
                border-radius: 5px;
                border: 1px solid #6F6F6F;
            }

            button {
                padding: 10px;
                font-size: 24px;
                border-radius: 5px;
                border: 1px solid #6F6F6F;
                background-color: #f2f2f2;
                cursor: pointer;
                transition: 0.3s;

                &:hover {
                    background-color: #6F6F6F;
                    color: #f2f2f2;
                }
            }
        }
    }
    aside {
        text-align: center;
        margin: 50px 35%;
        width: 30%;
        background-color: #f2f2f2;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px #000000a2;

        h2 {
            font-size: 36px;
            color: #6F6F6F;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                margin: 20px 0;
                padding: 20px;
                background-color: #e0e0e0;
                border-radius: 10px;

                h3 {
                    font-size: 24px;
                    color: #6F6F6F;
                }

                p {
                    font-size: 24px;
                    color: #6F6F6F;
                }
            }
        }
    }
</style>
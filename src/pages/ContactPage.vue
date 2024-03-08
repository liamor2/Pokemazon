<template>
    <headerComponent />
    <main>
        <h1>Contact Us</h1>
        <form>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="message">Message:</label>
                <textarea id="message" v-model="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        </form>
        <h2>Or</h2>
        <p>Send us an email at <a href="mailto:contact@pokemazon.net">contact@pokemazon.net</a></p>
        <p>Call us at <a href="tel:+8 94 85 62 45 13">+8 94 85 62 45 13</a></p>
        <p>Visit us at 12 Centrico Plaza, Lumiose City, Kalos</p>
    </main>
    <footerComponent />
</template>

<script setup>
    import { ref } from 'vue';
    import HeaderComponent from '../components/header.vue';
    import FooterComponent from '../components/footer.vue';

    const name = ref('');
    const email = ref('');
    const message = ref('');

    const handleSubmit = () => {
    };
</script>

<style lang="scss" scoped>
    main {
        text-align: center;
        margin: 75px 35%;
        width: 30%;
        background-color: #f2f2f2;
        padding: 20px;
        border-radius: 10px;

        form {
            display: flex;
            flex-direction: column;
            gap: 10px;

            div {
                display: flex;
                flex-direction: column;
                gap: 5px;

                label {
                    font-size: 1.5rem;
                }

                input, textarea {
                    padding: 0.5rem;
                    border-radius: 5px;
                    border: none;
                    box-shadow: 0 0 5px #000000a2;
                }
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
        }
    }
</style>
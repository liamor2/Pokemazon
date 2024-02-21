<template>
    <img :src="pokemon.sprites.front_default" alt="pokemon" />
    <p>{{ pokemon.name }}</p>
</template>

<script setup>
import gsap from 'gsap';
import { defineProps, onMounted } from 'vue'

const props = defineProps({
    pokemon: Object
})

onMounted(() => {
    gsap.fromTo('img', { opacity: 0 }, { opacity: 1, duration: 1 })
})

</script>

<style lang="scss" scoped>
img {
    width: 100px;
    height: 100px;
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.5);
    }
}

p {
    text-transform: capitalize;
    text-align: center;
    font-size: 1.5rem;
    color: #dbdbdb;
}
</style>
<template>
    <div class="pokemon-container" @mouseover="handleMouseOver" @mouseout="handleMouseOut">
        <img id="pokeball" src="../assets/pokeball.png" alt="pokeball"/>
        <img id="pokemon" :src="pokemon.sprites.front_default" alt="pokemon"/>
    </div>
    <p>{{ pokemon.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}</p>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue'

const props = defineProps({
    pokemon: Object
})

onMounted(() => {
    gsap.fromTo('.pokemon-container img#pokemon', { opacity: 0 }, { opacity: 1, duration: 0.2 })
})

const handleMouseOver = (event) => {
    const container = event.target.closest('.pokemon-container');
    gsap.to(container.querySelector('img#pokeball'), { opacity: 0.2, transform: 'scale(0.5)', duration: 0.5 });
    gsap.to(container.querySelector('img#pokemon'), { transform: 'scale(1.5)', duration: 0.5 });
}

const handleMouseOut = (event) => {
    const container = event.target.closest('.pokemon-container');
    gsap.to(container.querySelector('img#pokeball'), { opacity: 1, transform: 'scale(1)', duration: 0.5 });
    gsap.to(container.querySelector('img#pokemon'), { transform: 'scale(1)', duration: 0.5 });
}

</script>

<style lang="scss" scoped>

div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin-right: 5rem;

    img#pokeball {
        position: absolute;
        width: 100px;
        height: 100px;
    }
    img#pokemon {
        position: relative;
        width: 75px;
        height: 75px;
        z-index: 1;
        padding: 10px 10px 10px 15px;
    }
}

p {
    width: 95%;
    position: absolute;
    text-transform: capitalize;
    text-align: right;
    font-size: 1.5rem;
    color: #dbdbdb;
}
</style>
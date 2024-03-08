<template>
    <article class="image-carrousel">
        <div class="image-container">
            <img :src="pokemon.sprites.front_default" alt="pokemon" />
            <img :src="pokemon.sprites.back_default" alt="pokemon" />
            <p v-if="pokemon.sprites.front_female">Normal Male Version</p>
            <p v-else>Normal Version</p>
        </div>
        <div v-if="pokemon.sprites.front_female" class="image-container">
            <img :src="pokemon.sprites.front_female" alt="pokemon" />
            <img :src="pokemon.sprites.back_female" alt="pokemon" />
            <p>Normal Female Version</p>
        </div>
        <div class="image-container">
            <img :src="pokemon.sprites.front_shiny" alt="pokemon" />
            <img :src="pokemon.sprites.back_shiny" alt="pokemon" />
            <p v-if="pokemon.sprites.front_female"> Shiny Male Version</p>
            <p v-else>Shiny Version</p>
        </div>
        <div v-if="pokemon.sprites.front_shiny_female" class="image-container">
            <img :src="pokemon.sprites.front_shiny_female" alt="pokemon" />
            <img :src="pokemon.sprites.back_shiny_female" alt="pokemon" />
            <p>Shiny Female Version</p>
        </div>
        <div v-if="pokemon.forms.length > 1" class="image-container" v-for="form in pokemon.forms" :key="form.name">
            <img :src="form.sprites.front_default" alt="pokemon" />
            <img v-if="form.sprites.back_default" :src="form.sprites.back_default" alt="pokemon" />
            <p>{{ form.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }} Version</p>
        </div>
        <div v-if="pokemon.forms.length > 1" class="image-container" v-for="form in pokemon.forms" :key="form.name">
            <img :src="form.sprites.front_shiny" alt="pokemon" />
            <img v-if="form.sprites.back_shiny" :src="form.sprites.back_shiny" alt="pokemon" />
            <p>{{ form.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }} Shiny Version</p>
        </div>
        <div class="image-container">
            <img :src="pokemon.sprites.other.showdown.front_default" alt="pokemon" />
            <img :src="pokemon.sprites.other.showdown.back_default" alt="pokemon" />
            <p>Showdown Version</p>
        </div>
        <div class="image-container">
            <img :src="pokemon.sprites.other.showdown.front_shiny" alt="pokemon" />
            <img :src="pokemon.sprites.other.showdown.back_shiny" alt="pokemon" />
            <p>Showdown Shiny Version</p>
        </div>
    </article>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue'
const props = defineProps({
    pokemon: Object
})

let index = 0

onMounted(() => {
    carrousel()
})

const carrousel = () => {
    const images = document.querySelectorAll('.image-carrousel .image-container')
    if (images.length > 0) {
        setInterval(() => {
            gsap.set(images, { display: 'none' })
            index = (index + 1) % images.length
            gsap.set(images[index], { display: 'flex' })
        }, 3600)
    } else {
        setTimeout(carrousel, 1)
    }
}
</script>

<style lang="scss" scoped>
.image-carrousel {
    width: 100%;
    max-width: 600px;
    justify-content: right;
    .image-container {
        width: 100%;
        display: none;
        flex-wrap: wrap;
        justify-content: space-between;
        img {
            height: 200px;
            width: auto;
            max-width: 40%;
            object-fit: cover;
            overflow: visible;
            margin: auto;
            image-rendering: pixelated;
        }
        p {
            width: 100%;
            padding: 1rem;
            text-align: center;
            background-color: #000000;
            color: #ffffff;
            font-size: 1.5rem;
            border-radius: 50px;
        }
    }
}
.image-carrousel .image-container:first-child {
    display: flex;
}
</style>
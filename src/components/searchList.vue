<template>
    <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.name">
            <img :src="pokemon.sprites.front_default" alt="pokemon" />
            <p>{{ pokemon.name }}</p>
        </li>
    </ul>
    <div>
        <button v-if="pokemonStore.page > 1" @click="handleClick">Previous</button>
        <button v-if="pokemonStore.page < 5000" @click="handleClick">Next</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon-store.js'
const props = defineProps({
    pokemons: Array,
    pokemonStore: Object
})

const pokemonStore = usePokemonStore()

const emit = defineEmits(['update:page'])

async function handleClick() {
    if (event.target.textContent === 'Previous') {
        await pokemonStore.prevPage()
    } else {
        await pokemonStore.nextPage()
    }
    emit('update:page', pokemonStore.page)
}
</script>

<style lang="scss" scoped>

</style>
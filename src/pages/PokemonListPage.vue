<template>
    <div class="home">
        <h1>Pokedex</h1>
        <input type="text" placeholder="Search" />
    </div>
    <list-component :pokemons="pokemonPage" @update:page="handlePageChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import listComponent from '../components/searchList.vue'
import { usePokemonStore } from '../stores/pokemon-store.js'

const pokemonStore = usePokemonStore()
const page = ref(1)
const pokemonPage = ref([])

onMounted(async () => {
    await pokemonStore.fetchPokemons()
    pokemonPage.value = pokemonStore.pokemonPage
})

function handlePageChange(newPage) {
    page.value = newPage
    pokemonPage.value = pokemonStore.pokemonPage
}
</script>

<style scoped>

</style>
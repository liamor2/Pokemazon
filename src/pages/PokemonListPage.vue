<template>
    <div class="home">
        <h1>Pokedex</h1>
        <input type="text" placeholder="Search" />
        <button @click="handleClick">Search</button>
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

async function handleClick() {
    let search = document.querySelector('input').value.toLowerCase()
    await pokemonStore.fetchPokemons()
    let searchResult = pokemonStore.state.pokemons.filter(pokemon => pokemon.name.includes(search))
    pokemonStore.createPokemonSearchPage(searchResult)
    pokemonPage.value = pokemonStore.pokemonPage
}
</script>

<style lang="scss" scoped>

</style>
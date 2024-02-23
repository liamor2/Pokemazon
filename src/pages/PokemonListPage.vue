<template>
    <header-component />
    <div class="home">
        <h1>Pokedex</h1>
        <input type="text" placeholder="Search" />
        <button @click="handleSearch">Search</button>
        <button @click="handleReset">Reset</button>
    </div>
    <list-component :pokemons="pokemonPage" @update:page="handlePageChange" />
    <footer-component />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import listComponent from '../components/searchList.vue'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'



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

async function handleSearch() {
    let search = document.querySelector('input').value.toLowerCase()
    await pokemonStore.fetchPokemons()
    pokemonStore.goToPage(1)
    let searchResult = pokemonStore.state.pokemons.filter(pokemon => pokemon.name.includes(search))
    pokemonStore.createPokemonSearchPage(searchResult)
    pokemonPage.value = pokemonStore.pokemonPage
}

async function handleReset() {
    await pokemonStore.reset()
    pokemonPage.value = pokemonStore.pokemonPage
}
</script>

<style lang="scss" scoped>

</style>
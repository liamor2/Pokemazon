<template>
    <header-component />
    <div class="home">
        <h1>Pokedex</h1>
        <input type="text" placeholder="Search" list="pokemons" />
        <button @click="handleSearch">Search</button>
        <button @click="handleReset">Reset</button>
        <datalist id="pokemons">
            <option v-for="pokemon in pokemonStore.state.pokemons" :key="pokemon.name" :value="pokemon.name" />
        </datalist>
    </div>
    <list-component :pokemons="pokemonPage" @update:page="handlePageChange" />
    <footer-component />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import listComponent from '../components/searchList.vue'
import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'



import { usePokemonStore } from '../script/pokemon-store.js'

const pokemonStore = usePokemonStore()
const page = ref(1)
const pokemonPage = ref([])

onMounted(async () => {
    await pokemonStore.fetchPokemons()
    await pokemonStore.createPokemonPage()
    pokemonPage.value = pokemonStore.pokemonPage
})

function handlePageChange(newPage) {
    page.value = newPage
    pokemonPage.value = pokemonStore.pokemonPage
}

async function handleSearch() {
    let search = document.querySelector('input').value.toLowerCase()
    let searchResult = pokemonStore.state.pokemons.filter(pokemon => pokemon.name.includes(search))
    if (searchResult.length === 1 && searchResult[0].name.toLowerCase() === search) {
        window.location.href = `#/pokemon/${search}`
    } else {
        pokemonStore.goToPage(1)
        pokemonStore.createPokemonSearchPage(searchResult)
        pokemonPage.value = pokemonStore.pokemonPage
    }
}

async function handleReset() {
    await pokemonStore.reset()
    pokemonPage.value = pokemonStore.pokemonPage
    document.querySelector('input').value = ''
}
</script>

<style lang="scss" scoped>

</style>../script/pokemon-store.js
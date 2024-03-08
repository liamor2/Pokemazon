<template>
    <header-component />
    <section>
        <h2>Pokedex</h2>
        <input type="text" placeholder="Search" list="pokemons" />
        <button @click="handleSearch">Search</button>
        <button @click="handleReset">Reset</button>
        <datalist id="pokemons">
            <option v-for="pokemon in pokemonStore.state.pokemons" :key="pokemon.name" :value="pokemon.name" />
        </datalist>
    </section>
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
    await pokemonStore.fetchAllPokemons()
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
section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    h2 {
        width: 100%;
        margin: 0;
        text-align: center;
    }
    input {
        width: 50%;
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid #333;
    }
    button {
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid #333;
        background-color: #f2f2f2;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
            background-color: #333;
            color: #f2f2f2;
        }
    }
}
</style>
<template>
    <div class="home">
        <h1>Pokedex</h1>
        <input type="text" placeholder="Search" />
    </div>
    <list-component :pokemons="pokemonPage" :page="page" @update:page="handlePageChange" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import listComponent from '../components/searchList.vue'

var pokemons = ref([])
var pokemonPage = ref([])
var page = ref(1)
var pageNumber = ref(20)

onMounted(async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const json = await response.json()
        pokemons.value = json.results
        for (let i = 0; i < pageNumber.value; i++) {
        pokemonPage.value.push(pokemons.value[i + (page.value - 1) * pageNumber.value])
        }
        console.log(pokemons.value)
    } catch (error) {
        console.error(error)
    }
})

function handlePageChange(newPage) {
    page.value = newPage
    pokemonPage.value = []
    for (let i = 0; i < pageNumber.value; i++) {
        pokemonPage.value.push(pokemons.value[i + (page.value - 1) * pageNumber.value])
    }
}
</script>

<style scoped>

</style>
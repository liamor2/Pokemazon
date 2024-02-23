<template>
    <div>
        <p>{{ pokemon.value.name }}</p>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemon-store.js'
// import gsap from 'gsap';

const pokemon = ref(null)
const urlName = ref(null)

onBeforeMount(async () => {
    urlName.value = window.location.href.split('/').pop()
    pokemon.value = await pokemonStore.fetchPokemon(urlName.value)
})

const emit = defineEmits(['update:page'])

const pokemonStore = usePokemonStore()
</script>

<style>
</style>

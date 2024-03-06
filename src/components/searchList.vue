<template>
    <div v-if="pokemonStore.state.loading">
        <loading />
    </div>
    <div v-else>
        <ul>
            <li v-for="pokemon in pokemons" :key="pokemon.name">
                <button @click="handlePokemon">
                    <pokemon-list-element :pokemon="pokemon" />
                </button>
            </li>
        </ul>
        <div id="pagination">
            <button @click="handleClick" :disabled="pokemonStore.page <= 1">
                <i class="fa-solid fa-arrow-left"></i>
                <p>Previous</p>
            </button>
            <div>
                <input type="number" v-model="pokemonStore.page" min="1" max="pokemonStore.pageTotal" />
                <p>of {{ pokemonStore.pageTotal }}</p>
            </div>
            <button @click="handleClick" :disabled="pokemonStore.page >= pokemonStore.pageTotal">
                <p>Next</p>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { usePokemonStore } from '../script/pokemon-store.js'
import  pokemonListElement  from './pokemonListElement.vue'
import loading from './loading.vue';


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

async function handlePokemon() {
    let pokemon = event.target.closest('li').querySelector('p').textContent
    window.location.href = `#/pokemon/${pokemon}`
}
</script>

<style lang="scss" scoped>

button {
    padding: 0.5rem 1rem;
    margin: 1rem 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: #e0e0e0;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-transform: uppercase;
    outline: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2%;
}

li {
    margin: 1%;
    width: 23%;
    display: flex;
    flex-direction: wrap;
    gap: 1rem;
    justify-content: center;
    transition: transform 0.3s;

    button{
        position: relative;
        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: background-color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 1rem;
        font-weight: bold;
        color: #000;
        text-transform: uppercase;
        outline: none;

        &:hover {
            background-color: #f0f0f0;
        }

        &:hover:deep p {
            color: #000;
        }
    }

    &:hover {
        transform: scale(1.05);
    }
}

button:hover {
    background-color: #f0f0f0;
}

button:active {
    background-color: #e0e0e0;
}

button:disabled {
    background-color: #f0f0f0;
    color: #ccc;
    cursor: not-allowed;
}

button:disabled:hover {
    background-color: #f0f0f0;
}

button:disabled:active {
    background-color: #f0f0f0;
}

div#pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    text-transform: uppercase;
    text-align: center;
    outline: none;
}

div#pagination div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-transform: uppercase;
    text-align: center;
    outline: none;
}

div#pagination input {
    width: 3rem;
    height: 2rem;
    text-align: center;
    margin: 0 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: #e0e0e0;
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    text-transform: uppercase;
    outline: none;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}
</style>
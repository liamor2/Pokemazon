<template>
<ul>
    <li v-for="pokemon in pokemons" :key="pokemon.name">
        {{ pokemon.name }}
    </li>
</ul>
<div>
    <button v-if="page > 1" @click="handleClick">Previous</button>
    <button v-if="page < 5000" @click="handleClick">Next</button>
</div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    pokemons: Array,
    page: Number
})

const emit = defineEmits(['update:page'])

let page = ref(props.page)

function handleClick() {
    if (event.target.textContent === 'Previous') {
        emit('update:page', --page.value)
    } else {
        emit('update:page', ++page.value)
    }
}
</script>

<style lang="scss" scoped>

</style>
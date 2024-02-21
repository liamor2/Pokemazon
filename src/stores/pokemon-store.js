import { defineStore } from 'pinia'
import { ref, reactive, watch, onMounted, computed } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
    onMounted(async () => {
        try {
            console.log('Mounted')
        } catch (error) {
            console.error(error)
        }
    });

    const state = reactive({
        pokemons: [],
        selectedPokemon: null,
        loading: false,
        error: null,
    });
    const page = ref(1)
    const pageNumber = ref(20)
    const pokemonPage = ref([])

    const fetchPokemons = async () => {
        state.loading = true;
        try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const json = await response.json()
        state.pokemons = json.results
        console.log(state.pokemons)
        for (let i = 0; i < pageNumber.value; i++) {
            const pokemonName = state.pokemons[i + (page.value - 1) * pageNumber.value].name;
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const pokemonData = await response.json();
            pokemonPage.value.push(pokemonData);
        }
        console.log(pokemonPage.value)
        } catch (error) {
            console.error(error)
        }
    };

    const fetchPokemon = async (name) => {
        state.loading = true;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const json = await response.json()
            state.selectedPokemon = json
        } catch (error) {
            console.error(error)
        }
    };

    watch(page, () => {
        pokemonPage.value = []
        for (let i = 0; i < pageNumber.value; i++) {
            pokemonPage.value.push(state.pokemons[i + (page.value - 1) * pageNumber.value])
        }
    })

    const pageTotal = computed(() => {
        return Math.ceil(state.pokemons.length / pageNumber.value)
    })

    const nextPage = () => {
        if (page.value < pageTotal.value) {
            ++page.value
        }
    }

    const prevPage = () => {
        if (page.value > 1) {
            --page.value
        }
    }

    const goToPage = (index) => {
        page.value = index
    }

    return {
        state,
        fetchPokemons,
        fetchPokemon,
        page,
        pageNumber,
        pokemonPage,
        pageTotal,
        nextPage,
        prevPage,
        goToPage,
    }

})
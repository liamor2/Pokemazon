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
            state.pokemons = []
            state.pokemons = json.results
            await createPokemonPage()
        } catch (error) {
            console.error(error)
        }
    };

    const createPokemonPage = async () => {
        pokemonPage.value = []
        for (let i = 0; i < pageNumber.value; i++) {
            const pokemonName = state.pokemons[i + (page.value - 1) * pageNumber.value].name;
            fetchPokemon(pokemonName)
        }
        pokemonPage.value.sort((a, b) => a.order - b.order)
        console.log(pokemonPage.value)
    }

    const createPokemonSearchPage = async (searchResult) => {
        state.pokemons = searchResult
        await createPokemonPage()
    }

    const fetchPokemon = async (name) => {
        state.loading = true;
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await response.json();
            pokemonPage.value.push(pokemonData);
        } catch (error) {
            console.error(error)
        }
    };

    watch(page, async () => {
        await createPokemonPage()
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
        createPokemonPage,
        createPokemonSearchPage,
        page,
        pageNumber,
        pokemonPage,
        pageTotal,
        nextPage,
        prevPage,
        goToPage,
    }

})
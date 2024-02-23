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
        currentPokemons: [],
        selectedPokemon: null,
        loading: false,
        error: null,
    });
    const page = ref(1)
    const pageNumber = ref(20)
    const pokemonPage = ref([])

    let isDataFetched = false;

    const fetchPokemons = async () => {
        if (!isDataFetched) {
            state.loading = true;
            try {
                console.log('Fetching pokemons');
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
                const json = await response.json();
                state.pokemons = json.results;
                state.currentPokemons = state.pokemons.map(pokemon => pokemon.name)
                await createPokemonPage()
                isDataFetched = true;
            } catch (error) {
                console.error(error);
            }
            state.loading = false;
        }
    };

    const fetchPokemon = async (name) => {
        state.loading = true;
        let pokemonData;
        console.log(name);
        const fetchedPokemon = state.pokemons.find(pokemon => pokemon.name === name);
        if (!fetchedPokemon.fetch || !fetchedPokemon) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            pokemonData = await response.json();
            pokemonData.fetch = true;
            state.pokemons.splice(state.pokemons.findIndex(pokemon => pokemon.name === name), 1, pokemonData);
        } else {
            pokemonData = fetchedPokemon;
        }
        state.loading = false;
        return pokemonData;
    };

    const createPokemonPage = async () => {
        pokemonPage.value = []
        if (state.currentPokemons.length === 0) {
            return;
        } else if (state.currentPokemons.length < pageNumber.value) {
            for (let i = 0; i < state.currentPokemons.length; i++) {
                const pokemonName = state.currentPokemons[i];
                let pokemon = await fetchPokemon(pokemonName);
                pokemonPage.value.push(pokemon);
            }
            // console.log(pokemonPage.value)
            return;
        } else {
            for (let i = 0; i < pageNumber.value; i++) {
                const pokemonName = state.currentPokemons[(page.value - 1) * pageNumber.value + i];
                let pokemon = await fetchPokemon(pokemonName);
                pokemonPage.value.push(pokemon);
            }

        }
        pokemonPage.value.sort((a, b) => a.order - b.order)
        // console.log(pokemonPage.value)
    }

    const createPokemonSearchPage = async (searchResult) => {
        state.currentPokemons = searchResult.map(pokemon => pokemon.name)
        if (state.currentPokemons.length === 0) {
            pokemonPage.value = []
            return;
        }
        if (page.value !== 1) {
            page.value = 1
        }
        await createPokemonPage()        
    }

    const reset = async () => {
        state.currentPokemons = []
        state.currentPokemons = state.pokemons.map(pokemon => pokemon.name)
        state.selectedPokemon = null;
        state.loading = false;
        state.error = null;
        page.value = 1;
        pokemonPage.value = []
        isDataFetched = false;
        await createPokemonPage()
    }

    watch(page, async () => {
        await createPokemonPage()
    })

    const pageTotal = computed(() => {
        return Math.ceil(state.currentPokemons.length / pageNumber.value)
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
        reset,
        page,
        pageNumber,
        pokemonPage,
        pageTotal,
        nextPage,
        prevPage,
        goToPage,
    }

})
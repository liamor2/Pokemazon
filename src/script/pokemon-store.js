import { defineStore } from 'pinia'
import { ref, reactive, watch, onMounted, computed } from 'vue'

export const usePokemonStore = defineStore('pokemon', () => {
    onMounted(async () => {
        try {
            console.log('Pokemon Store Mounted')
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
    const pokemonPerPage = ref(20)
    const pokemonPage = ref([])

    let isDataFetched = false;

    const fetchAllPokemons = async () => {
        if (!isDataFetched) {
            state.loading = true;
            try {
                console.log('Fetching pokemons');
                const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0');
                const json = await response.json();
                state.pokemons = json.results.map(pokemon => ({ ...pokemon, fetch: false }));
                state.currentPokemons = state.pokemons.map(pokemon => pokemon.name);
                isDataFetched = true;
            } catch (error) {
                console.error(error);
            }
            state.loading = false;
        }
    };

    const fetchOnePokemon = async (name) => {
        state.loading = true;
        let pokemonData;
        if (name === undefined) {
            state.loading = false;
            return false;
        }
        const fetchedPokemon = state.pokemons.find(pokemon => pokemon.name === name);
        if (!fetchedPokemon.fetch || !fetchedPokemon) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            pokemonData = await response.json();
            pokemonData.fetch = true;
            pokemonData.price = calculatePokemonPrice(pokemonData);
            if (pokemonData.forms.length > 1) {
                for (let i = 1; i < pokemonData.forms.length; i++) {
                    const response = await fetch(pokemonData.forms[i].url);
                    const form = await response.json();
                    pokemonData.forms[i] = form;
                }
                pokemonData.forms.shift();
            }
            state.pokemons.splice(state.pokemons.findIndex(pokemon => pokemon.name === name), 1, pokemonData);
        } else {
            pokemonData = fetchedPokemon;
        }
        state.loading = false;
        return pokemonData;
    };

    const calculatePokemonPrice = (pokemon) => {
        var price = pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
        let sum = 0;
        for (let i = 0; i < pokemon.name.length; i++) {
            sum += pokemon.name.charCodeAt(i);
        }
        price += sum % 100;
        price += pokemon.abilities.length * Math.pow(2, pokemon.abilities.length);
        for (let i = 0; i < pokemon.moves.length; i++) {
            price ++;
        }
        if (pokemon.forms.length > 1) {
            price *= pokemon.forms.length;
        }
        if (pokemon.types.length === 2) {
            price *= 1.5;
        }
        price *= 5;
        price += 9 - (price % 10);
        price += 0.99;
        return price;
    }

    const createPokemonPage = async () => {
        state.loading = true;
        pokemonPage.value = []
        if (state.currentPokemons.length === 0) {
            return;
        } else if (state.currentPokemons.length < pokemonPerPage.value) {
            for (let i = 0; i < state.currentPokemons.length; i++) {
                const pokemonName = state.currentPokemons[i];
                let pokemon = await fetchOnePokemon(pokemonName);
                pokemonPage.value.push(pokemon);
            }
            return;
        } else {
            for (let i = 0; i < pokemonPerPage.value; i++) {
                const pokemonName = state.currentPokemons[(page.value - 1) * pokemonPerPage.value + i];
                let pokemon = await fetchOnePokemon(pokemonName);
                if (pokemon) {
                    pokemonPage.value.push(pokemon);
                }
            }

        }
        pokemonPage.value.sort((a, b) => a.order - b.order)
        state.loading = false;
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

    const generateDailyPokemon = async (seed) => {
        await fetchAllPokemons()
        const pokemonIndex = seed % state.pokemons.length;
        const pokemon = state.pokemons[pokemonIndex];
        return pokemon.name;
    };

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

    const changePokemonPerPage = (value) => {
        pokemonPerPage.value = value
        page.value = 1
        createPokemonPage()
    }

    watch(page, async () => {
        await createPokemonPage()
    })

    const pageTotal = computed(() => {
        return Math.ceil(state.currentPokemons.length / pokemonPerPage.value)
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
        fetchAllPokemons,
        fetchOnePokemon,
        createPokemonPage,
        createPokemonSearchPage,
        generateDailyPokemon,
        reset,
        changePokemonPerPage,
        page,
        pokemonPerPage,
        pokemonPage,
        pageTotal,
        nextPage,
        prevPage,
        goToPage,
    }

})
<template>
    <header-component />
    <article v-if="pokemon">
        <section>
            <table>
                <tr>
                    <td colspan="10">
                        <carrousel-component :pokemon="pokemon" />
                    </td>
                    <td colspan="1">Name: {{ sanitizeString(pokemon.name) }}</td>
                    <td colspan="1">
                        <p>Price: {{ price }} ₽</p>
                        <form @submit.prevent="addToCart" @change="updatePrice">
                            <label for="level">Level:</label>
                            <input type="number" id="level" min="1" max="100" v-model="pokemonLevel" title="The level of the Pokémon that you want to buy. The greater the level, the more expensive the Pokémon." />
                            <label for="gender">Gender:</label>
                            <label class="switch" title="The gender of the Pokémon that you want to buy. This has no impact on the price.">
                                <input type="checkbox" v-model="pokemonGender" @change="slider" />
                                <span class="slider round">
                                    <i class="fa-solid fa-venus"></i>
                                </span>
                            </label>
                            <label for="version">Version:</label>
                            <fieldset title="The color scheme of the Pokémon that you want to buy. Shiny are rare and more expensive.">
                                <legend>Color</legend>
                                <input type="radio" id="normal" name="color" value="normal" v-model="pokemonVersion.color" checked>
                                <label for="normal">Normal</label>
                                <input type="radio" id="shiny" name="color" value="shiny" v-model="pokemonVersion.color">
                                <label for="shiny">Shiny</label>
                            </fieldset>
                            <fieldset title="The training of the Pokémon that you want to buy. Showdown pokemon are designed for competitive battles and thus are more expensive.">
                                <legend>Training</legend>
                                <input type="radio" id="classic" name="training" value="classic" v-model="pokemonVersion.training" checked>
                                <label for="normal">Classic</label>
                                <input type="radio" id="showdown" name="training" value="showdown" v-model="pokemonVersion.training">
                                <label for="shiny">Showdown</label>
                            </fieldset>
                            <select v-if="pokemon.forms.length > 1" title="Forms">
                                <option disabled value="">Forms</option>
                                <option v-for="form in pokemon.forms" :value="form.name">{{ sanitizeString(form.name) }}</option>
                            </select>
                            <label for="quantity">Quantity:</label>
                            <input type="number" id="quantity" min="1" v-model="quantity" title="The quantity of the Pokémon that you want to buy." />
                            <button type="submit" title="Add to cart" v-if="loggedIn"><i class="fa-solid fa-cart-plus"></i></button>
                            <button type="button" title="Login to buy" v-else><a href="#/login"><i class="fa-solid fa-right-to-bracket"></i></a></button>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td colspan="1">
                        Cry:
                        <button @click="playAudio" title="Play cry"><i class="fa-solid fa-play"></i></button>
                        <audio ref="audioPlayer" volume="0.2">
                            <source :src="pokemon.cries.latest" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </td>
                    <td colspan="1">Height: {{ pokemon.height.toString().slice(0, -1) }},{{ pokemon.height.toString().slice(-1) }}m</td>
                    <td colspan="1">Weight: {{ pokemon.weight.toString().slice(0, -1) }},{{ pokemon.height.toString().slice(-1) }}kg</td>
                    <td>
                        <p>Abilities:</p>
                        <ul>
                            <li v-for="ability in pokemon.abilities">{{ sanitizeString(ability.ability.name) }}</li>
                        </ul>
                    </td>
                    <td>
                        <p>Types:</p>
                        <ul>
                            <li v-for="pokemonType in pokemon.types">
                                <img :src="importedTypeIcon(pokemonType.type.name)" alt="type" />
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td colspan="10" class="stats">
                        <p>Stats:</p>
                        <ul>
                            <li v-for="stat in pokemon.stats">
                                <p>{{ sanitizeString(stat.stat.name) }}</p>
                                <div class="stat-bar">
                                    <div>
                                        <p>{{ stat.base_stat }}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </section>
    </article>
    <loading v-else />
    <footer-component />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePokemonStore } from '../script/pokemon-store.js'
import gsap from 'gsap'

import headerComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
import loading from '../components/loading.vue'
import carrouselComponent from '../components/carrousel.vue'

import typeIconBug from '../assets/types_icons/bug.png'
import typeIconDark from '../assets/types_icons/dark.png'
import typeIconDragon from '../assets/types_icons/dragon.png'
import typeIconElectric from '../assets/types_icons/electric.png'
import typeIconFairy from '../assets/types_icons/fairy.png'
import typeIconFighting from '../assets/types_icons/fighting.png'
import typeIconFire from '../assets/types_icons/fire.png'
import typeIconFlying from '../assets/types_icons/flying.png'
import typeIconGhost from '../assets/types_icons/ghost.png'
import typeIconGrass from '../assets/types_icons/grass.png'
import typeIconGround from '../assets/types_icons/ground.png'
import typeIconIce from '../assets/types_icons/ice.png'
import typeIconNormal from '../assets/types_icons/normal.png'
import typeIconPoison from '../assets/types_icons/poison.png'
import typeIconPsychic from '../assets/types_icons/psychic.png'
import typeIconRock from '../assets/types_icons/rock.png'
import typeIconSteel from '../assets/types_icons/steel.png'
import typeIconWater from '../assets/types_icons/water.png'


const pokemonStore = usePokemonStore()

const loggedIn = ref(localStorage.getItem('loggedIn') === 'true' ? true : false)
const urlName = ref(null)
const pokemon = ref(null)
const price = ref(null)
const pokemonLevel = ref(1)
const pokemonGender = ref(false)
const pokemonVersion = ref({
    color: 'normal',
    training: 'classic',
    form: 'normal',
    image: ''
})
const quantity = ref(1)

onMounted(async () => {
    await pokemonStore.fetchAllPokemons()
    urlName.value = window.location.href.split('/').pop()
    try {
        pokemon.value = await pokemonStore.fetchOnePokemon(urlName.value)
        price.value = pokemon.value.price
        barAnimation()
    } catch (error) {
        console.error(error)
        pokemon.value = null
        window.location.href = `#/404`
    }
})
let index = 0

const sanitizeString = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const importedTypeIcon = (typeName) => {
    switch (typeName) {
        case 'bug':
            return typeIconBug
        case 'dark':
            return typeIconDark
        case 'dragon':
            return typeIconDragon
        case 'electric':
            return typeIconElectric
        case 'fairy':
            return typeIconFairy
        case 'fighting':
            return typeIconFighting
        case 'fire':
            return typeIconFire
        case 'flying':
            return typeIconFlying
        case 'ghost':
            return typeIconGhost
        case 'grass':
            return typeIconGrass
        case 'ground':
            return typeIconGround
        case 'ice':
            return typeIconIce
        case 'normal':
            return typeIconNormal
        case 'poison':
            return typeIconPoison
        case 'psychic':
            return typeIconPsychic
        case 'rock':
            return typeIconRock
        case 'steel':
            return typeIconSteel
        case 'water':
            return typeIconWater
        default:
            return ''
    }
}

const barAnimation = () => {
    setTimeout(() => {
        const bars = document.querySelectorAll('.stat-bar div')
        bars.forEach(bar => {
            const barValue = bar.textContent
            const barWidth = Math.min(parseInt(barValue), 255) / 255 * 100
            gsap.fromTo(bar, { width: 0 }, { width: barWidth + '%', duration: 1 })
            if (barWidth >= 100) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#00B2FF', duration: 1 })
            } else if (barWidth >= 90) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#00FFF6', duration: 1 })
            } else if (barWidth >= 80) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#00FF94', duration: 1 })
            } else if (barWidth >= 70) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#00FF33', duration: 1 })
            } else if (barWidth >= 60) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#2AFF00', duration: 1 })
            } else if (barWidth >= 50) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#88FF00', duration: 1 })
            } else if (barWidth >= 40) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#D6FF00', duration: 1 })
            } else if (barWidth >= 30) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#FFE800', duration: 1 })
            } else if (barWidth >= 20) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#FFB400', duration: 1 })
            } else if (barWidth >= 10) {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#FF5200', duration: 1 })
            } else {
                gsap.fromTo(bar, { backgroundColor: '#ff0000' }, { backgroundColor: '#FF0000', duration: 1 })
            }
            gsap.fromTo(bar.querySelector('p'), { display: 'none', opacity: 0 }, { display: 'block', opacity: 1, duration: 1})
            for (let i = 0; i <= barValue; i++) {
                setTimeout(() => {
                    bar.querySelector('p').textContent = i
                }, i * 10)
            }
        })
    }, 1000)
}

const playAudio = () => {
    const audio = document.querySelector('audio')
    audio.play()
}

const slider = () => {
    const slider = document.querySelector('.slider')
    const icon = document.querySelector('.slider i')
    if (pokemonGender.value) {
        slider.style.backgroundColor = '#2196F3'
        icon.classList.remove('fa-venus')
        icon.classList.add('fa-mars')
    } else {
        slider.style.backgroundColor = '#db19d2'
        icon.classList.remove('fa-mars')
        icon.classList.add('fa-venus')
    }
}

const updatePrice = () => {
    let newPrice = pokemon.value.price
    if (pokemonLevel.value > 1 && pokemonLevel.value <= 100) {
        newPrice += (pokemonLevel.value - 1) * 100
    } else {
        pokemonLevel.value = 1
    }
    if (pokemonVersion.value.training === 'showdown') {
        newPrice += 1000
    }
    if (pokemonVersion.value.form !== 'normal') {
        newPrice *= 2
    }
    if (pokemonVersion.value.color === 'shiny') {
        newPrice *= 50
    }
    if (quantity.value > 1) {
        newPrice *= quantity.value
    } else {
        quantity.value = 1
    }
    gsap.to(price, { value: newPrice, duration: 2 })
}

const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const pokemonToCart = {
        id: cart.length + 1,
        name: pokemon.value.name,
        level: pokemonLevel.value,
        gender: pokemonGender.value,
        color: pokemonVersion.value.color,
        training: pokemonVersion.value.training,
        form: pokemonVersion.value.form,
        quantity: 1,
        image: pokemon.value.sprites.front_default,
        price: price.value,
    }
    if (pokemonVersion.value.form !== 'normal') {
        pokemonToCart.form = pokemonVersion.value.form
    }
    if (quantity.value > 1) {
        pokemonToCart.quantity = quantity.value
    }
    cart.push(pokemonToCart)
    localStorage.setItem('cart', JSON.stringify(cart))
    window.location.href = '#/cart'
}
</script>

<style lang="scss" scoped>
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
    table {
        width: 100%;
        tr {
            td {
                text-align: center;
                padding: 1rem;
                border: 1px solid #000000a2;
                border-radius: 10px;
                background-color: #3f3f3f;
                button {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 5px;
                    background-color: #e0e0e0;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #000;
                    text-transform: uppercase;
                    outline: none;
                    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    label {
                        font-size: 1.5rem;
                    }
                    label.switch {
                        position: relative;
                        display: inline-block;
                        width: 60px;
                        height: 34px;
                        margin: 0 auto;
                        input {
                            opacity: 0;
                            width: 0;
                            height: 0;
                        }
                        .slider {
                            position: absolute;
                            cursor: pointer;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background-color: #db19d2;
                            -webkit-transition: .4s;
                            transition: .4s;
                            border-radius: 34px;
                            &:before {
                                position: absolute;
                                content: "";
                                height: 26px;
                                width: 26px;
                                left: 4px;
                                bottom: 4px;
                                background-color: white;
                                -webkit-transition: .4s;
                                transition: .4s;
                                border-radius: 50%;
                            }
                        }
                        input:checked + .slider {
                            background-color: #2196F3;
                        }
                        input:focus + .slider {
                            box-shadow: 0 0 1px #2196F3;
                        }
                        input:checked + .slider:before {
                            -webkit-transform: translateX(26px);
                            -ms-transform: translateX(26px);
                            transform: translateX(26px);
                        }
                        .slider.round {
                            border-radius: 34px;
                        }
                        .slider.round:before {
                            border-radius: 50%;
                        }
                        i{
                            position: absolute;
                            top: 40%;
                            left: 24%;
                            transform: translate(-50%, -50%);
                            font-size: 1.5rem;
                            color: #000;
                            transition: transform 0.3s;
                            scale: 0.7;
                        }
                        input:checked + .slider i {
                            transform: translate(120%, -50%);
                        }
                    }
                    input {
                        padding: 0.5rem;
                        border-radius: 5px;
                        border: none;
                        box-shadow: 0 0 5px #000000a2;
                    }
                    button {
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 5px;
                        background-color: #e0e0e0;
                        cursor: pointer;
                        transition: background-color 0.3s;
                        font-size: 1rem;
                        font-weight: bold;
                        color: #000;
                        text-transform: uppercase;
                        outline: none;
                        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
                    }
                }
                audio {
                    display: none;
                }
                ul {
                    list-style: none;
                    display: flex;
                    justify-content: space-between;
                    li {
                        img {
                            width: 50px;
                        }
                    }
                }
                
            }
            td.stats {
                ul {
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    li {
                        width: 15%;
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                        p {
                            font-size: 1.3rem;
                        }
                        .stat-bar {
                            width: 100%;
                            height: 20px;
                            background-color: #a5a5a5;
                            border-radius: 5px;
                            overflow: hidden;
                            div {
                                width: 0;
                                height: 100%;
                                background-color: #ff0000;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                p {
                                    display: none;
                                    font-size: 1rem;
                                    font-weight: bold;
                                    color: #000;
                                    text-transform: uppercase;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<template>
    <header-component />
    <article v-if="pokemon">
        <p>{{ pokemon.name }}</p>
        <div class="image-carrousel">
            <div class="image-container">
                <img :src="pokemon.sprites.front_default" alt="pokemon" />
                <img :src="pokemon.sprites.back_default" alt="pokemon" />
                <p>Normal Version</p>
            </div>
            <div v-if="pokemon.sprites.front_female" class="image-container">
                <img :src="pokemon.sprites.front_female" alt="pokemon" />
                <img :src="pokemon.sprites.back_female" alt="pokemon" />
                <p>Normal Female Version</p>
            </div>
            <div class="image-container">
                <img :src="pokemon.sprites.front_shiny" alt="pokemon" />
                <img :src="pokemon.sprites.back_shiny" alt="pokemon" />
                <p>Shiny Version</p>
            </div>
            <div v-if="pokemon.sprites.front_shiny_female" class="image-container">
                <img :src="pokemon.sprites.front_shiny_female" alt="pokemon" />
                <img :src="pokemon.sprites.back_shiny_female" alt="pokemon" />
                <p>Shiny Female Version</p>
            </div>
            <div v-if="pokemon.forms.length > 1" class="image-container" v-for="form in pokemon.forms" :key="form.name">
                <img :src="form.sprites.front_default" alt="pokemon" />
                <img v-if="form.sprites.back_default" :src="form.sprites.back_default" alt="pokemon" />
                <p>{{ form.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }} Version</p>
            </div>
            <div v-if="pokemon.forms.length > 1" class="image-container" v-for="form in pokemon.forms" :key="form.name">
                <img :src="form.sprites.front_shiny" alt="pokemon" />
                <img v-if="form.sprites.back_shiny" :src="form.sprites.back_shiny" alt="pokemon" />
                <p>{{ form.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }} Shiny Version</p>
            </div>
            <div class="image-container">
                <img :src="pokemon.sprites.other.showdown.front_default" alt="pokemon" />
                <img :src="pokemon.sprites.other.showdown.back_default" alt="pokemon" />
                <p>Showdown Version</p>
            </div>
            <div class="image-container">
                <img :src="pokemon.sprites.other.showdown.front_shiny" alt="pokemon" />
                <img :src="pokemon.sprites.other.showdown.back_shiny" alt="pokemon" />
                <p>Showdown Shiny Version</p>
            </div>
        </div>
        <section>
            <div>
                <p>Price:</p>
                <p>{{ pokemon.price }} ₽</p>
            </div>
            <p>Cry:</p>
            <audio controls volume="0.2">
                <source :src="pokemon.cries.latest" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
            <p>Height: {{ pokemon.height }}</p>
            <p>Weight: {{ pokemon.weight }}</p>
            <p>Abilities:</p>
            <ul>
                <li v-for="ability in pokemon.abilities">{{ ability.ability.name }}</li>
            </ul>

            <p>Types:</p>
            <ul>
                <li v-for="pokemonType in pokemon.types">
                    <img :src="importedTypeIcon(pokemonType.type.name)" alt="type" />
                </li>
            </ul>
        </section>
        <aside>
            <p>Stats:</p>
            <ul>
                <li v-for="stat in pokemon.stats">
                    <p>{{ stat.stat.name }}</p>
                    <div class="stat-bar">
                        <div>
                            <p>{{ stat.base_stat }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </aside>
    </article>
    <loading v-else />
    <footer-component />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePokemonStore } from '../script/pokemon-store.js'
import gsap from 'gsap'

import HeaderComponent from '../components/header.vue'
import footerComponent from '../components/footer.vue'
import loading from '../components/loading.vue'

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

const urlName = ref(null)
const pokemon = ref(null)


onMounted(async () => {
    await pokemonStore.fetchPokemons()
    urlName.value = window.location.href.split('/').pop()
    try {
        pokemon.value = await pokemonStore.fetchPokemon(urlName.value)
        console.log(pokemon.value)
        barAnimation()
        carrousel()
    } catch (error) {
        console.error(error)
        pokemon.value = null
        window.location.href = `#/404`
    }
})
let index = 0

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

const carrousel = () => {
    const images = document.querySelectorAll('.image-carrousel .image-container')
    if (images.length > 0) {
        setInterval(() => {
            gsap.set(images, { display: 'none' })
            index = (index + 1) % images.length
            gsap.set(images[index], { display: 'flex' })
        }, 1000)
    } else {
        setTimeout(carrousel, 1)
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
            // the number in the bar must be animated and go from 0 to the value of the stat
            gsap.fromTo(bar.querySelector('p'), { display: 'none', opacity: 0 }, { display: 'block', opacity: 1, duration: 1})
            for (let i = 0; i <= barValue; i++) {
                setTimeout(() => {
                    bar.querySelector('p').textContent = i
                }, i * 10)
            }
        })
    }, 1000)
}
</script>

<style lang="scss" scoped>

article {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    p {
        font-size: 2rem;
    }
    .image-carrousel {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        .image-container {
            width: 50%;
            display: none;
            flex-wrap: wrap;
            justify-content: space-between;
            img {
                height: 200px;
                width: auto;
                object-fit: cover;
                margin: auto;
                image-rendering: pixelated;
            }
            p {
                width: 100%;
                padding: 1rem;
                text-align: center;
                background-color: #000000;
                color: #ffffff;
                font-size: 1.5rem;
                border-radius: 50px;
            }
        }
    }
    .image-carrousel .image-container:first-child {
        display: flex;
    }
    section {
        width: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        audio {
            width: 100%;
        }
        ul {
            display: flex;
            gap: 1rem;
            list-style: none;
            li {
                img {
                    width: 75px;
                }
            }
        }
        p {
            font-size: 1.5rem;
        }
    }
    aside {
        width: 45%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        ul {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            list-style: none;
            li {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                p {
                    font-size: 1.5rem;
                }
                .stat-bar {
                    width: 100%;
                    height: 20px;
                    background-color: #f0f0f0;
                    border-radius: 5px;
                    overflow: hidden;
                    padding: 1px;
                    div {
                        width: 0%;
                        height: 100%;
                        background-color: #f00;
                        border-radius: 5px;
                        text-align: center;
                        p {
                            margin: 0;
                            color: #000000;
                            display: none;
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>../script/pokemon-store.js
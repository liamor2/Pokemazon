<template>
  <header>
    <h1>
      <a href="#">
        <img src="../assets/logo.png" alt="Pokemazon logo" />
        Pokemazon
      </a>
    </h1>
    <nav>
      <ul>
        <li><a href="#"><i class="fa-solid fa-house"></i>Home</a></li>
        <li><a href="#/about"><i class="fa-solid fa-address-card"></i>About</a></li>
        <li><a href="#/contact"><i class="fa-solid fa-phone"></i>Contact</a></li>
        <li><a href="#/" @click="handleDailyPokemon"><i class="fa-solid fa-calendar-days"></i>Daily Pokemon</a></li>
      </ul>
      <ul>
        <li v-if="loggedIn"><a href="#/cart"><i class="fa-solid fa-cart-shopping"></i>Cart</a></li>
        <li v-if="loggedIn"><a href="#/account"><i class="fa-regular fa-user"></i>Account</a></li>
        <li v-if="loggedIn"><a href="#" @click="disconnect"><i class="fa-solid fa-right-from-bracket"></i>Disconnect</a></li>
        <li v-if="!loggedIn"><a href="#/login"><i class="fa-solid fa-right-to-bracket"></i>Login</a></li>
      </ul>
      
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useServerGestion } from '../script/server-gestion.js';
import { usePokemonStore } from '../script/pokemon-store.js';

const loggedIn = localStorage.getItem('loggedIn') === 'true' ? true : false;

const serverGestion = useServerGestion();
const pokemonStore = usePokemonStore();
const dailyPokemonID = ref('');

onMounted(() => {
  localStorage.setItem('loggedIn', loggedIn);
});

function disconnect() {
  serverGestion.logoutUser();
  localStorage.setItem('loggedIn', false);
  localStorage.removeItem('user');
  window.location.href = '/';
}

const handleDailyPokemon = async () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const today = `${year}${month}${day}`;
  dailyPokemonID.value = await pokemonStore.generateDailyPokemon(today);
  setTimeout(() => {
    window.location.href = `#/pokemon/${dailyPokemonID.value}`;
  }, 1);
};
</script>

<style lang="scss" scoped>
header {
  background-color: #f2f2f2a2;
  padding: 1%;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  h1 {
    width: 25%;
    margin: 0;
    gap: 10px;

    a{
      text-decoration: none;
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: #333;

      img{
        width: 20%;
      }
    }
  }

  nav{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;

    ul{
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;

      li{
        display: inline-block;
        margin-right: 10px;

        a{
          text-decoration: none;
          display: flex;
          align-items: center;
          color: #333;
          font: 1.5em sans-serif;

          i{
            margin-right: 5px;
          }
        }
      
      }
    }
  }

  aside{
    margin-left: auto;

    a{
      text-decoration: none;
      display: flex;
      color: #333;
      margin-left: 10px;

      i{
        margin-right: 5px;
      }
    }
  }
}
</style>

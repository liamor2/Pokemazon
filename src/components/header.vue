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
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <aside>
      <a href="#" v-if="loggedIn">Cart</a>
      <a href="#" v-if="loggedIn">Account</a>
      <a href="#" v-if="loggedIn">Disconnect</a>
      <a href="#" v-if="!loggedIn">Login</a>
    </aside>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
defineProps({
  loggedIn: Boolean
});

onMounted(() => {
  localStorage.setItem('loggedIn', loggedIn);
});
</script>

<style lang="scss" scoped>
header {
  background-color: #f2f2f2;
  padding: 20px;

  h1 {
    margin: 0;
    gap: 10px;

    a{
      text-decoration: none;
      display: flex;
      align-items: center;
      font-size: 2rem;
      color: #333;

      img{
        width: 5%;
      }
    }
  }

  nav{

    ul{
      list-style: none;
      padding: 0;
      margin: 0;

      li{
        display: inline-block;
        margin-right: 10px;

        a{
          text-decoration: none;
          color: #333;
        }
      
      }
    }
  }

  aside{
    margin-left: auto;

    a{
      text-decoration: none;
      color: #333;
      margin-left: 10px;
    }
  }
}
</style>

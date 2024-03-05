<template>
  <header>
    <h1>Pokemon</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
header {
  background-color: #f2f2f2;
  padding: 20px;
}

h1 {
  margin: 0;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}
</style>

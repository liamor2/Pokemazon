<template>
  <footer>
    <p>This is the footer</p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
footer {
  background-color: #f5f5f5;
  padding: 1%;
  text-align: center;
  position: relative;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  box-sizing: border-box;
}
</style>

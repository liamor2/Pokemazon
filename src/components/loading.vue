<template>
    <div class="loading-page">
        <img src="../assets/pokeball.png" alt="pokeball" />
        <i class="fa-solid fa-spinner"></i>
        <p>Loading</p>
    </div>
</template>

<script>
export default {
    name: 'Loading',
}
</script>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue'

onMounted(() => {
    gsap.fromTo('.loading-page img', { y: 0 }, { y: -20, duration: 0.5, repeat: -1, yoyo: true, ease: 'easeInOut' })
    gsap.fromTo('.loading-page i', { rotate: 0 }, { rotate: 360, duration: 1, repeat: -1, ease: 'none' })
})

</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 2rem;
    gap: 3rem;

    img{
        width: 10%;
        object-fit: contain;
    }
    i{
        font-size: 2rem;
    }
    p{
        font-size: 1.5rem;
    }
}
</style>

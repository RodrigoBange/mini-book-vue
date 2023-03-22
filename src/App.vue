<script setup>
import { useUserStore } from "@/stores/UserStore";
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

useUserStore().autoLogin();
</script>

<template>
    <navigation />
    <RouterView />
    <Footer />
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  margin-top: 3.9em;
  flex-grow: 1;
}

</style>

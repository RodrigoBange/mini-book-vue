<script>
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

export default {
  name: "App",
  components: {
    Navigation,
    Footer
  }
};
</script>

<template>
    <navigation />
    <RouterView />
    <Footer />
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  margin-top: 56px;
  flex-grow: 1;
}

</style>

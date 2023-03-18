<template>
  <footer class="bg-light text-center text-lg-start footer-color">
    <div class="text-center p-3">
      © 2023 Copyright:
      <router-link to="/" class="text-dark">MiniBook.com</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer-color {
  background-color: #ffffff;
  border-top: 1px solid #bdcfe1;
}

a,
a:focus,
a:hover {
  color: #fff;
}
</style>
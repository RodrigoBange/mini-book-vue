<template>
  <main>
    <div class="cover-container p-4 rounded d-flex justify-content-center align-items-center">
      <div class="inner cover">
        <h1 class="cover-heading mb-3 text-center">Stay connected with<br>Mini Book</h1>
        <p class="lead mb-3">All your friends, family and connections in one place.</p>
        <p class="lead text-center">
          <router-link to="/login" class="btn btn-lg btn-secondary">Get started</router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #ffffff;
  text-shadow: none; /* Prevent inheritance from `body` */
  background-color: #8792cc;
  border: .05rem solid #fff;
}

.cover-container {
  max-width: 55em;
  background-color: white;
  margin: 5em 5em 12em;
}

/*
 * Cover
 */
.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  color: #2f3242;
}

.cover .btn-lg {
  padding: .75rem 1.25rem;
  font-weight: 700;
}
</style>
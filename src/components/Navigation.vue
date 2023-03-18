<template>
  <nav class="navbar navbar-expand-md navbar-color">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link
          >
        </li>      
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active"
            >Products</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active"
          >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/feed" class="nav-link" active-class="active"
          >Feed</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link" active-class="active"
          >Profile</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/editprofile" class="nav-link" active-class="active"
          >Edit Profile</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.navbar-color {
  background-color: #ffffff;
  border-bottom: 1px solid #bdcfe1;
}

.nav-link {
  color: #202226;
  font-weight: normal;
}

.active {
  font-weight: bolder;
  color: #202226;
}
</style>
<template>
  <nav class="navbar navbar-expand-md navbar-color">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item " v-if="loggedIn === false">
          <router-link to="/login" class="nav-link d-flex align-items-center" active-class="active"
          >Login</router-link>
        </li>
        <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
          <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mb-2 mb-md-0">
        <li class="nav-item" v-if="loggedIn === true">
          <router-link :to="'/profile/' + userStore.userId" :key="userStore.userId"
             class="nav-link d-flex align-items-center" active-class="active"
          >
            <p class="m-0 nav-spacing" v-if="userStore.firstName !== 'null'">{{ userStore.firstName }}</p>
            <p class="m-0 nav-spacing" v-else>Profile</p>
            <img src="/images/blank_avatar.png" class="rounded-circle avatar nav-spacing" style="height: 30px;">
          </router-link>
        </li>
        <li class="nav-item d-flex align-items-center nav-spacing" v-if="loggedIn === true">
          <router-link :to="'/editprofile/' + userStore.userId" class="nav-link" active-class="active"
          >Edit Profile</router-link>
        </li>
        <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
          <button @click="logout" class="btn nav-link" active-class="active"
          >Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "Navigation",
  data() {
    return {
      userStore: useUserStore()
    };
  },
  computed: {
    loggedIn: function () {
      return this.userStore.getLoggedIn;
    }
  },
  watch: {
      loggedIn: function (newValue, oldValue) {
      console.log("loggedIn changed from " + oldValue + " to " + newValue);
    }
  },
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({path: "/login"});
    }
  }
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

.nav-spacing {
  margin-right: 0.5em;
}

.avatar {
  margin-left: 10px;
}
</style>
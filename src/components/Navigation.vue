<template>
  <nav class="navbar navbar-expand-lg navbar-color navbar-collapse">
    <div class="mobile-menu d-flex justify-content-end w-100">
      <div class="nav-item" v-if="loggedIn === true">
        <router-link :to="'/profile/' + userStore.userId" :key="userStore.userId"
                     class="nav-link d-flex align-items-center" active-class="active"
        >
          <p class="m-0 nav-spacing" v-if="userStore.firstName !== 'null'">{{ userStore.firstName }}</p>
          <p class="m-0 nav-spacing" v-else>Profile</p>
          <img :src="userStore.profile_picture" class="rounded-circle avatar nav-spacing" style="height: 30px;">
        </router-link>
      </div>
      <button class="btn btn-outline-secondary menu-btn align-self-end" type="button" @click="expandMenu" style="margin-right: 0.5em;">
        <span>Menu</span>
      </button>
    </div>
    <div class="container-fluid">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item " v-if="loggedIn === false">
            <router-link to="/login" class="nav-link d-flex align-items-center" active-class="active"
            >Login</router-link>
          </li>
          <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
            <router-link to="/" class="nav-link" active-class="active"
            >Home</router-link>
          </li>
          <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
            <router-link to="/search" class="nav-link" active-class="active"
            >Search
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center" v-if="isAdmin === true">
            <router-link to="/admin" class="nav-link" active-class="active"
            >Management
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav mb-2 mb-md-0">
          <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
            <router-link to="/requests" class="nav-link" active-class="active"
            >Requests
            </router-link>
          </li>
          <li class="nav-item" v-if="loggedIn === true">
            <router-link :to="'/profile/' + userStore.userId" :key="userStore.userId"
                         class="nav-link d-flex align-items-center" active-class="active"
            >
              <p class="m-0 nav-spacing" v-if="userStore.firstName !== 'null'">{{ userStore.firstName }}</p>
              <p class="m-0 nav-spacing" v-else>Profile</p>
              <img :src="userStore.profile_picture" class="rounded-circle avatar nav-spacing" style="height: 30px;">
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
      <div v-if="displayMenu" class="mobile-menu">
        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item " v-if="loggedIn === false">
              <router-link to="/login" class="nav-link d-flex align-items-center" active-class="active"
              >Login</router-link>
            </li>
            <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
              <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link>
            </li>
            <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
              <router-link to="/search" class="nav-link" active-class="active"
              >Search
              </router-link>
            </li>
            <li class="nav-item d-flex align-items-center" v-if="isAdmin === true">
              <router-link to="/admin" class="nav-link" active-class="active"
              >Management
              </router-link>
            </li>
          </ul>
          <ul class="navbar-nav mb-2 mb-md-0">
            <li class="nav-item d-flex align-items-center" v-if="loggedIn === true">
              <router-link to="/requests" class="nav-link" active-class="active"
              >Requests
              </router-link>
            </li>
            <li class="nav-item" v-if="loggedIn === true">
              <router-link :to="'/profile/' + userStore.userId" :key="userStore.userId"
                           class="nav-link d-flex align-items-center" active-class="active"
              >
                <p class="m-0 nav-spacing" v-if="userStore.firstName !== 'null'">{{ userStore.firstName }}</p>
                <p class="m-0 nav-spacing" v-else>Profile</p>
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
      </div>
    </div>
  </nav>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth.js";

export default {
  name: "Navigation",
  data() {
    return {
      userStore: useUserStore(),
      displayMenu: false,
    };
  },
  computed: {
    loggedIn: function () {
      return this.userStore.getLoggedIn;
    },
    isAdmin: function() {
      if (this.userStore.userId !== '')
      {
        return this.userStore.getAdmin;
      }
    },
  },
  watch: {
      loggedIn: function (newValue, oldValue) {
        console.log("loggedIn changed from " + oldValue + " to " + newValue);
        if (newValue === true) {
          this.getProfilePicture();
        }
      },
      isAdmin: function (newValue, oldValue) {
        console.log("isAdmin changed from " + oldValue + " to " + newValue);
      },
  },
  created() {
    this.getProfilePicture();
  },
  methods: {
    logout() {
      this.userStore.logout();
      this.$router.push({path: "/login"});
    },
    getProfilePicture() {
      axios.get("/users/" + this.userStore.userId)
        .then(response => {
          this.userStore.profile_picture = response.data.profile_picture;
        })
        .catch(error => {
          console.log(error);
        });
    },
    expandMenu() {
      this.displayMenu = !this.displayMenu;
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

.mobile-menu {
  visibility: collapse;
}

@media screen and (max-width: 991px) {
  .mobile-menu {
    visibility: visible;
  }
}
</style>

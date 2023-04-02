<template>
  <div class="p-3 card d-flex flex-row mt-3 pfbanner" style="flex-basis: 48%">
    <router-link :to="'/profile/' + user.user_id">
      <img class="rounded-circle profile-pic m-0" :src="user.profile_picture">
    </router-link>
    <div class="p-3 pt-0 pb-0 d-flex flex-column">
      <div class="flex-grow-1">
        <router-link :to="'/profile/' + user.user_id" class="text-decoration-none text-dark">
          <h5 class="mb-0">{{user.first_name}} {{user.last_name}}</h5>
          <p>{{user.email}}</p>
        </router-link>
      </div>
      <div class="d-flex">
        <router-link :to="'/profile/' + user.user_id" class="btn btn-outline-primary btn-pf mb-0">Profile</router-link>
        <button class="btn btn-primary mb-0" @click="addFriend" v-if="showAddButton">Add Friend</button>
        <button class="btn btn-outline-primary mb-0 disabled" v-if="isPending">Pending</button>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth.js";

export default {
  name: "ProfileBanner",
  props: {
    user: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      isFriend: true,
      isPending: false,
      useUserStore: useUserStore,
    };
  },
  mounted() {
    this.checkFriend();
  },
  methods: {
    addFriend() {
      axios.post("/users/relations", {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.user.user_id,
          accepted: false,
      }).then(response => {
        console.log(response);
        this.isPending = true;
      }).catch(error => {
        console.log(error);
      });
    },
    checkFriend() {
      axios.get("/users/relations/" + useUserStore().userId, {
        params: {
          friend: this.user.user_id
        }
      }).then(response => {
        console.log("Friendship:");
        console.log(response);
        if (response.data === false) {
          this.isFriend = false;
        }
        else if (response.data.accepted === false) {
          this.isPending = true;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  },
  computed: {
    showAddButton() {
      return !(this.user.user_id === parseInt(useUserStore().userId) || this.isFriend === true);
    }
  }
}
</script>

<style scoped>
.profile-pic {
  max-width: 100px;
  max-height: 100px;
  height: auto;
}

.btn-pf {
  margin-right: 10px;
}

.pfbanner:nth-child(odd) {
  margin-right: 1em;
}
</style>
<template>
  <div class="p-3 card d-flex flex-row mt-3 pfbanner banner">
    <router-link :to="'/profile/' + user.user_id">
      <img class="rounded-circle profile-pic m-0" :src="user.profile_picture">
    </router-link>
    <div class="p-3 pt-0 pb-0 d-flex flex-column w-100" style="padding-right: 0 !important;">
      <div>
        <router-link :to="'/profile/' + user.user_id" class="text-decoration-none text-dark">
          <h5 class="mb-0 text-break">{{user.first_name}} {{user.last_name}}</h5>
          <p class="text-break">{{user.email}}</p>
        </router-link>
      </div>
      <router-link :to="'/profile/' + user.user_id" class="btn btn-outline-primary mb-2">Profile</router-link>
      <div class="d-flex flex-wrap">
        <button class="btn btn-primary m-2 btn-space" style="margin-left: 0 !important;" @click="addFriend" v-if="showAddButton ">Add</button>
        <button class="btn btn-outline-primary disabled m-2 btn-space" style="margin-left: 0 !important;" v-if="isPending">Pending</button>
        <button class="btn btn-outline-danger justify-self-end mt-2 mb-2 btn-space" @click="cancelRequest" v-if="isPending">Cancel</button>
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
    async addFriend() {
      await axios.post("/users/relations", {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.user.user_id,
          accepted: false,
      }).then(response => {
        this.isPending = true;
      }).catch(error => {
        console.log(error);
      });
    },
    async checkFriend() {
      await axios.get("/users/relations/" + useUserStore().userId, {
        params: {
          friend: this.user.user_id
        }
      }).then(response => {
        if (response.data === false) {
          this.isFriend = false;
        }
        else if (response.data.accepted === false) {
          this.isPending = true;
        }
      }).catch(error => {
        console.log(error);
      });
    },
    async cancelRequest() {
      await axios.delete("/users/relations",{
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.user.user_id,
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.isPending = false;
          this.isFriend = false;
        }
      }).catch(error => {
        console.log(error)
      });
    },
  },
  computed: {
    showAddButton() {
      return !(this.user.user_id === parseInt(useUserStore().userId) || this.isFriend === true || this.isPending === true);
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

.pfbanner:nth-child(odd) {
  margin-right: 1em;
}

.banner {
  width: 48%;
  max-width: 48%;
}

.btn-space {
  width: 47.5%;
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    max-width: 100%;
  }

  .pfbanner:nth-child(odd) {
    margin-right: 0;
  }

  .btn-space {
    width: 48.5%;
  }
}
</style>

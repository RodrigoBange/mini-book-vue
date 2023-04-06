<template>
  <div class="d-flex flex-column p-2 link text-decoration-none banner">
    <div class="d-flex flex-row align-items-center pb-0">
      <router-link :to="'/profile/' + user.user_id" class="d-flex justify-content-center">
        <img class="rounded-circle mt-0 small-profile-pic mb-2"
             :src="user.profile_picture">
      </router-link>
      <button class="btn btn-outline-primary btn-pf m-2" @click="acceptRequest">ACCEPT</button>
      <button class="btn btn-outline-danger m-2" @click="declineRequest">DECLINE</button>
    </div>
    <div class="d-flex p-0">
      <router-link :to="'/profile/' + user.user_id" class="d-flex justify-content-center text-decoration-none">
        <p v-if="user.first_name" class="align-self-middle m-0 h5 flex-grow-1 text-break text-black">{{user.first_name}} {{user.last_name}}</p>
        <p v-else class="align-self-middle m-0 h5 flex-grow-1 text-black text-break">{{user.email}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth.js";

export default {
  name: "RequestBanner",
  props: {
    user: Object,
  },
  methods: {
    async acceptRequest() {
      await axios.post("/users/relations", {
        user_id_1: parseInt(useUserStore().userId),
        user_id_2: this.user.user_id,
        accepted: true,
      }).then(response => {
        if (response.data === true) {
          this.updateRequest();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    async updateRequest() {
      await axios.put("/users/relations", {
        user_id_1: this.user.user_id,
        user_id_2: parseInt(useUserStore().userId),
        accepted: true,
      }).then(response => {
        if (response.data === true) {
          this.$emit("update-request");
        }
      }).catch(error => {
        console.log(error);
      });
    },
    async declineRequest() {
      await axios.delete("/users/relations", {
        data: {
          user_id_1: this.user.user_id,
          user_id_2: parseInt(useUserStore().userId),
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.$emit("update-request");
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
.link {
  color: #202226;
  font-weight: normal;
}

.small-profile-pic
{
  width: 3em;
  height: 3em;
  margin-right: 0.5em;
}

.banner {
  width: 50%;
  max-width: 50%;
}

@media screen and (max-width: 768px) {
  .banner {
    width: 100%;
    max-width: 100%;
  }
}
</style>

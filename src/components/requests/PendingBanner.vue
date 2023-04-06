<template>
  <div class="d-flex flex-column p-2 link text-decoration-none banner">
    <div class="d-flex flex-row align-items-center pb-0">
      <router-link :to="'/profile/' + user.user_id" class="d-flex justify-content-center">
        <img class="rounded-circle mt-0 small-profile-pic mb-2"
             :src="user.profile_picture">
      </router-link>
      <button class="btn btn-outline-danger m-2" @click="cancelRequest">CANCEL</button>
    </div>
    <div class="d-flex p-0">
      <router-link :to="'/profile/' + user.user_id" class="d-flex justify-content-center text-decoration-none">
        <p v-if="user.first_name" class="align-self-middle m-0 h5 flex-grow-1 text-black text-break">{{user.first_name}} {{user.last_name}}</p>
        <p v-else class="align-self-middle m-0 h5 flex-grow-1 text-black text-break">{{user.email}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "@/axios-auth";
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "PendingBanner",
  props: {
    user: Object,
  },
  methods: {
    async cancelRequest() {
      await axios.delete("/users/relations", {
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.user.user_id,
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.$emit("update-pending");
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

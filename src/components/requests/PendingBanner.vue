<template>
  <div class="d-flex p-2 rounded align-items-center link text-decoration-none w-75">
    <router-link :to="'/profile/' + user.user_id" >
      <img class="rounded-circle mt-0 small-profile-pic"
           :src="user.profile_picture">
      <p class="align-self-middle m-0 h5 flex-grow-1 text-black">{{user.first_name}}</p>
    </router-link>
    <div class="d-flex">
      <button class="btn btn-outline-danger mb-0 m-2" @click="cancelRequest">CANCEL</button>
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
    cancelRequest() {
      axios.delete("/users/relations", {
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.user.user_id,
          accepted: false,
        }
      }).then(response => {
        console.log(response);
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
  margin-right: 1em;
}
</style>
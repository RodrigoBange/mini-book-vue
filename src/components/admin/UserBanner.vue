<template>
  <div class="d-flex p-1 border w-100 m-2">
    <router-link :to="'/profile/' +  user.user_id" class="w-100 d-flex align-items-center text-decoration-none link">
      <p class="align-self-middle m-1 text-break">{{user.user_id}}. </p>
      <p class="align-self-middle m-0 flex-grow-1" v-if="user.first_name">{{ user.first_name }} {{ user.last_name }}</p>
      <p class="align-self-middle m-0 flex-grow-1" v-else>{{ user.email }}</p>
    </router-link>
      <div class="d-flex flex-fill justify-content-end">
        <router-link :to="'/admin/users/edit/' + user.user_id" class="btn btn-outline-primary m-1">Edit</router-link>
        <button class="btn btn-outline-danger m-1" @click="deleteUser">Delete</button>
      </div>
  </div>
</template>

<script>
import axios from "@/axios-auth.js";
export default {
  name: "UserBanner",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async deleteUser() {
      await axios.delete("/users/" + this.user.user_id)
        .then(response => {
        if (response.data === true) {
          this.$emit("delete-user");
        }
      }).catch(error => {
        console.log(error);
      });
    },
  },
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
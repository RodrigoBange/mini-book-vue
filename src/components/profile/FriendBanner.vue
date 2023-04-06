<template>
  <div class="d-flex p-2">
    <router-link :to="'/profile/' +  user.user_id" class="w-100 d-flex align-items-center text-decoration-none link">
      <img class="rounded-circle mt-0 small-profile-pic"
           :src="user.profile_picture">
      <p class="align-self-middle m-0 h5 flex-grow-1 text-break" v-if="user.first_name">{{ user.first_name }} {{ user.last_name }}</p>
      <p class="align-self-middle m-0 h5 flex-grow-1 text-break" v-else>{{ user.email }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FriendBanner",
  props: {
    user: Object,
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
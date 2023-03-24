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
        <button class="btn btn-primary mb-0">Add Friend</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileBanner",
  props: {
    user: {
      type: Object,
      required: true
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
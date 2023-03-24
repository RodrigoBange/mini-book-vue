<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded-0 bg-white p-4 profile h-100" v-if="dataFetched">
      <div class="row h-100">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center mb-2">
            <h4 class="text-right mb-2" v-if="user.first_name !== null">{{user.first_name}} {{user.last_name}}</h4>
            <h4 class="text-right mb-2" v-else>{{user.email}}</h4>
            <img class="rounded-circle mt-0 profile-pic" v-if="user.profile_picture !== null" :src="user.profile_picture">
            <img class="rounded-circle mt-0 profile-pic" v-else src="/images/blank_avatar.png">
          </div>
          <div class="col-md-12 mb-2" v-if="user.gender !== null">
            <label class="labels">Gender</label><br>
            <span><strong>{{ user.gender }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.birthdate">
            <label class="labels">Birthday</label><br>
            <span><strong>{{ user.birthdate }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.state !== null && user.country !== null">
            <label class="labels">Location</label><br>
            <span><strong>{{ user.state + ", " + user.country }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.occupation">
            <label class="labels">Occupations</label><br>
            <span><strong>{{ user.occupation }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.relation_status">
            <label class="labels">Relationship status</label><br>
            <span><strong>{{ user.relation_status }}</strong></span>
          </div>
        </div>

        <div class="col-md-5 border-right overflow-auto h-100">
          <div class="p-3">
            <div class="row h-100">
              <div v-if="messages.length === 0">
                This user has not posted anything yet.
              </div>
              <Message v-for="message in messages"
                       :key="message.message_id"
                       :message="message"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <div class="d-flex justify-content-end align-items-center" v-if="isUserProfile">
              <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
            </div>
            <br>
            <div class="col-md-12">
              <label class="labels">Bio</label>
              <p class="border p-2" v-if="user.biography !== null">{{ user.biography }}</p>
              <p class="border p-2" v-else>This user has not written a bio yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>Loading data...</div>
  </main>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import Message from "@/components/messages/Message.vue";
import axios from "@/axios-auth.js";

export default {
  name: "Profile",
  props: {
    id: Number,
  },
  components: {Message},
  data() {
    return {
      user: {
        user_id: this.id,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        country: "",
        profile_picture: "",
        biography: "",
        gender: "",
        birthdate: "",
        languages: "",
        occupation: "",
        relation_status: "",
        socials: "",
      },
      messages: [],
      dataFetched: false,
      isUserProfile: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else {
      next();
    }
  },
  mounted() {
    this.getUser();
    this.getUserMessages();
    this.checkIfUserProfile();
  },
  watch: {
    id: function () {
      this.dataFetched = false;
      this.getUser();
      this.getUserMessages();
      this.checkIfUserProfile();
    }
  },
  methods: {
    getUser() {
      axios.get("/users/" + this.id)
          .then(
              result => {
                this.user = result.data;
                this.dataFetched = true;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    getUserMessages() {
      axios.get("/messages/" + this.id)
          .then(
              result => {
                this.messages = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    checkIfUserProfile() {
      this.user.user_id = this.id;
      this.isUserProfile = this.user.user_id == useUserStore().userId;
    },
    editProfile() {
      this.$router.push({path: "/editprofile/" + useUserStore().userId});
    }
  }
}
</script>

<style scoped>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

.profile-pic {
  max-width: 150px;
  height: auto;
}

.bio {
  max-height: 33.6em;
}
</style>
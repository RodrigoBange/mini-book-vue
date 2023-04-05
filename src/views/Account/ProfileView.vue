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
          <div class="col-md-12 mb-2" v-if="user.gender">
            <label class="labels">Gender</label><br>
            <span><strong>{{ user.gender }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.birthdate">
            <label class="labels">Birthday</label><br>
            <span><strong>{{ user.birthdate }}</strong></span>
          </div>
          <div class="col-md-12 mb-2" v-if="user.state && user.country">
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
                       :display-only="true"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div>
            <div class="d-flex justify-content-end align-items-center" v-if="isUserProfile">
              <button class="btn btn-primary" @click="editProfile">Edit Profile</button>
            </div>
            <div class="d-flex justify-content-end align-items-center" v-if="!isUserProfile">
              <button class="btn btn-outline-primary" @click="addFriend" v-if="!isFriend && !isPending && !isRequestPending">Add Friend</button>
              <button class="btn btn-outline-danger" @click="deleteFriend" v-if="isFriend">Delete Friend</button>
              <button class="btn btn-outline-primary disabled" v-if="isPending">Pending</button>
              <button class="btn btn-outline-danger" @click="cancelRequest" v-if="isPending">Cancel</button>
              <button class="btn btn-outline-primary" @click="acceptRequest" v-if="isRequestPending">Accept</button>
              <button class="btn btn-outline-danger" @click="declineRequest" v-if="isRequestPending">Decline</button>
            </div>
            <br>
            <div class="col-md-12">
              <label class="labels">Friends</label>
              <div class="d-flex flex-column">
                <friend-banner v-for="friend in friends"
                               :key="friend.user_id"
                               :user="friend"
                />
              </div>
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
import FriendBanner from "@/components/profile/FriendBanner.vue";

export default {
  name: "Profile",
  props: {
    id: Number,
  },
  components: {FriendBanner, Message},
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
      friends: [],
      dataFetched: false,
      isUserProfile: false,
      relation: {
        user_id_1: "",
        user_id_2: "",
        accepted: "",
      },
      relationRequest: {
        user_id_1: "",
        user_id_2: "",
        accepted: "",
      }
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
    this.getRelations();
    this.dataFetched = true;
  },
  watch: { // In case the user changes the id in the url
    id: function () {
      this.dataFetched = false;
      this.getUser();
      this.getUserMessages();
      this.checkIfUserProfile();
      this.getRelations();
      this.dataFetched = true;
    }
  },
  methods: {
    getUser() {
      axios.get("/users/" + this.id)
          .then(
              result => {
                this.user = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    getUserMessages() {
      axios.get("/messages/users/" + this.id)
          .then(
              result => {
                this.messages = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    getRelations() {
      axios.get("/users/relations/" + this.id + "/" + 1)
          .then(
              result => {
                this.friends = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    checkIfUserProfile() {
      this.user.user_id = this.id;
      this.isUserProfile = this.user.user_id == useUserStore().userId;
      if (!this.isUserProfile) {
        this.checkIfFriend();
        this.checkIfRequestPending();
      }
    },
    checkIfFriend() {
      axios.get("/users/relations/" + useUserStore().userId, {
        params: {
          friend: this.user.user_id,
        }
      })
          .then(
              result => {
                if (result.data !== false) {
                  this.relation = result.data;
                } else {
                  this.relation = null;
                }
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    checkIfRequestPending() {
      axios.get("/users/relations/" + this.user.user_id, {
        params: {
          friend: useUserStore().userId,
        }
      })
          .then(
              result => {
                if (result.data !== false) {
                  this.relationRequest = result.data;
                } else {
                  this.relationRequest = null;
                }
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    cancelRequest() {
      axios.delete("/users/relations",{
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.id,
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.relation = null;
          this.isFriend = false;
          this.isPending = false;
        }
      }).catch(error => {
        console.log(error)
      });
    },
    addFriend() {
      axios.post("/users/relations", {
        user_id_1: parseInt(useUserStore().userId),
        user_id_2: this.id,
        accepted: false,
      }).then(response => {
        if (response.data === true) {
          this.relation = {
            user_id_1: parseInt(useUserStore().userId),
            user_id_2: this.id,
            accepted: false,
          };
          this.isFriend = false;
          this.isPending = true;
        }
      }).catch(error => {
        console.log(error)
      });
    },
    editProfile() {
      this.$router.push({path: "/editprofile/" + useUserStore().userId});
    }
  },
  computed: {
    isFriend: function() {
      if (this.relation === null) {
        return false;
      }
      return this.relation.accepted === true;
    },
    isPending: function() {
      if (this.relation === null) {
        return false;
      }
      return this.relation.accepted === false;
    },
    isRequestPending: function() {
      if (this.relationRequest === null) {
        return false;
      }
      return this.relationRequest.accepted === false;
    },
  },
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
</style>

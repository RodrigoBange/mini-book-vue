<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded-0 bg-white p-4 profile h-100" v-if="dataFetched">
      <div class="row h-100">
        <div class="col-md-3 border-right h-100">
          <div class="d-flex flex-column align-items-center text-center mb-2">
            <h4 class="text-right mb-2" v-if="user.first_name !== null">{{user.first_name}} {{user.last_name}}</h4>
            <h4 class="text-right mb-2" v-else>{{user.email}}</h4>
            <img class="rounded-circle mt-0 profile-pic" v-if="user.profile_picture !== null" :src="user.profile_picture">
            <img class="rounded-circle mt-0 profile-pic" v-else src="/images/blank_avatar.png">
          </div>
          <div class="row overflow-auto flex-fill">
            <div class="col-md-12" >
              <label class="labels">Bio</label>
              <p class="border p-2 overflow-auto" style="max-height: 15em;" v-if="user.biography !== null">{{ user.biography }}</p>
              <p class="border p-2" v-else>This user has not written a bio yet.</p>
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
              <button class="btn btn-outline-primary m-2" @click="addFriend" v-if="!isFriend && !isPending && !isRequestPending">Add Friend</button>
              <button class="btn btn-outline-danger m-2" @click="deleteFriend" v-if="isFriend">Delete Friend</button>
              <button class="btn btn-outline-primary m-2 disabled" v-if="isPending">Pending</button>
              <button class="btn btn-outline-danger m-2" @click="cancelRequest" v-if="isPending">Cancel</button>
              <button class="btn btn-outline-primary m-2" @click="acceptRequest" v-if="isRequestPending">Accept</button>
              <button class="btn btn-outline-danger m-2" @click="declineRequest" v-if="isRequestPending">Decline</button>
            </div>
            <div class="col-md-12">
              <label class="labels">Friends</label>
              <div class="d-flex flex-column">
                <friend-banner v-for="friend in friends"
                               :key="friend.user_id"
                               :user="friend"
                />
              </div>
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
      },
      isFriend: false,
      isPending: false,
      isRequestPending: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else {
      next();
    }
  },
  async mounted() {
    await this.getUser();
    await this.getUserMessages();
    await this.checkIfUserProfile();
    await this.getRelations();
    this.dataFetched = true;
  },
  watch: { // In case the user changes the id in the url
    id: async function () {
      this.dataFetched = false;
      await this.getUser();
      await this.getUserMessages();
      await this.checkIfUserProfile();
      await this.getRelations();
      this.dataFetched = true;
    }
  },
  methods: {
    async getUser() {
      await axios.get("/users/" + this.id)
          .then(
              result => {
                this.user = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    async getUserMessages() {
      await axios.get("/messages/users/" + this.id)
          .then(
              result => {
                this.messages = result.data;
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    async getRelations() {
      await axios.get("/users/relations/" + this.id + "/" + 1)
          .then(
              result => {
                this.friends = result.data;
                this.checkRelations();
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
    async checkIfFriend() {
      await axios.get("/users/relations/" + useUserStore().userId, {
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
                this.checkRelations();
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    async checkIfRequestPending() {
      await axios.get("/users/relations/" + this.user.user_id, {
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
                this.checkRelations();
              }
          )
          .catch(
              error => console.log(error)
          )
    },
    async cancelRequest() {
      await axios.delete("/users/relations",{
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.id,
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.relation = null;
          this.checkRelations();
        }
      }).catch(error => {
        console.log(error)
      });
    },
    async addFriend() {
      await axios.post("/users/relations", {
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
          this.checkRelations();
        }
      }).catch(error => {
        console.log(error)
      });
    },
    async deleteFriend() {
      await axios.delete("/users/relations", {
        data: {
          user_id_1: parseInt(useUserStore().userId),
          user_id_2: this.id,
          accepted: true,
        }
      }).then(response => {
        if (response.data === true) {
          this.relation = null;
          this.checkRelations();
        }
      }).catch(error => {
        console.log(error)
      });
    },
    async acceptRequest() {
      await axios.post("/users/relations", {
        user_id_1: parseInt(useUserStore().userId),
        user_id_2: this.id,
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
        user_id_1: this.id,
        user_id_2: parseInt(useUserStore().userId),
        accepted: true,
      }).then(response => {
        if (response.data === true) {
          this.relation = {
            user_id_1: this.id,
            user_id_2: parseInt(useUserStore().userId),
            accepted: true,
          };
          this.relationRequest = null;
          this.checkRelations();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    async declineRequest() {
      await axios.delete("/users/relations", {
        data: {
          user_id_1: this.id,
          user_id_2: parseInt(useUserStore().userId),
          accepted: false,
        }
      }).then(response => {
        if (response.data === true) {
          this.relation = null;
          this.relationRequest = null;
          this.checkRelations();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    checkRelations() {
      this.isFriend = this.getFriend;
      this.isPending = this.getPending;
      this.isRequestPending = this.getRequestPending;
    },
    editProfile() {
      this.$router.push({path: "/editprofile/" + useUserStore().userId});
    }
  },
  computed: {
    getFriend() {
      if (this.relation === null) {
        return false;
      }
      return this.relation.accepted === true;
    },
    getPending() {
      if (this.relation === null) {
        return false;
      }
      return this.relation.accepted === false;
    },
    getRequestPending() {
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

<template>
 <main class="d-flex flex-fill overflow-hidden">
   <div class="container d-flex flex-column flex-fill">
     <div class="d-flex justify-content-center align-content-center flex-grow-1 overflow-hidden">
       <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row h-100">
         <div class="card rounded-0 h-100" style="width: 100%;">
           <div class="form-outline p-4 pb-1 pt-3">
             <input type="search" id="form1" class="form-control" placeholder="Search for people" aria-label="Search"
             v-model="searchWord"/>
           </div>
           <div class="d-flex p-3 pt-0 flex-row flex-wrap profiles">
             <ProfileBanner
                 v-for="user in users"
                 :key="user.user_id"
                 :user="user"/>
             <p class="m-2 w-100 text-center" v-if="!usersFound">No users were found.</p>
           </div>
         </div>
       </div>
     </div>
   </div>
   <p>{{error}}</p>
 </main>
</template>

<script>
import axios from "@/axios-auth.js";
import ProfileBanner from "@/components/profile/ProfileBanner.vue";

export default {
  name: "SearchProfile",
  components: {ProfileBanner},
  data() {
    return {
      searchWord: "",
      users: [],
      usersFound: false,
      error: ""
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    search() {
      if (this.searchWord.length > 0 && this.searchWord !== " ") {
        axios.get("/users/profiles/" + this.searchWord)
            .then(
                response => {
                  this.users = response.data;
                  this.usersFound = true;
                }
            )
            .catch(
                error => {
                  this.usersFound = false;
                  this.users = [];
                }
            );
      } else if (this.searchWord.length === 0) {
        axios.get("/users/profiles")
            .then(
                response => {
                  this.users = response.data;
                  this.usersFound = true;
                }
            )
            .catch(
                error => {
                  this.usersFound = false;
                  this.users = [];
                  this.error = error.data.message;
                }
            );
      }
    },
  },
  watch: {
    searchWord: function() {
      this.search();
    }
  }
}
</script>

<style scoped>
</style>

<template>
 <main class="d-flex flex-fill overflow-hidden">
   <div class="container d-flex flex-column flex-fill">
     <div class="d-flex justify-content-center align-content-center flex-grow-1 overflow-hidden">
       <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row h-100">
         <div class="card rounded-0 h-100" style="width: 100%;">
           <div class="form-outline p-4 pb-1 pt-3">
             <input type="search" id="form1" class="form-control"
                    placeholder="Search for people by name, surname or email" aria-label="Search"
             v-model="searchWord"/>
           </div>
             <div class="d-flex p-3 pt-0 flex-row flex-wrap profiles h-100 overflow-auto align-content-start">
               <ProfileBanner
                   v-for="user in users"
                   :key="user.user_id"
                   :user="user"/>
               <p class="m-2 w-100 text-center" v-if="!usersFound">No users were found.</p>
             </div>
           <nav aria-label="navigation" class="bg-white" style="width: 100%;">
             <ul class="pagination m-0">
               <li class="page-item">
                 <button class="page-link rounded-0" aria-label="Previous" @click="changePage(1)">
                   <span aria-hidden="true">&laquo;</span>
                 </button>
               </li>
               <li v-for="page in pages" class="page-item">
                 <button class="page-link rounded-0" @click="changePage(page)">{{page}}</button>
               </li>
               <li class="page-item">
                 <button class="page-link rounded-0" aria-label="Next" @click="changePage(Math.ceil(messageCount / limit))">
                   <span aria-hidden="true">&raquo;</span>
                 </button>
               </li>
             </ul>
           </nav>
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
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "SearchProfile",
  components: {ProfileBanner},
  data() {
    return {
      searchWord: "",
      users: [],
      userCount: 0,
      usersFound: false,
      error: "",
      limit: 5,
      offset: 0,
      pages: 0,
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    async search() {
      if (this.searchWord.length > 0 && this.searchWord !== " ") {
        await axios.get("/users/profiles/" + this.searchWord, {
          params: {
            limit: this.limit,
            offset: this.offset
          }
        })
            .then(
                response => {
                  this.users = response.data;
                  this.usersFound = true;
                  this.getPagination(this.searchWord)
                }
            )
            .catch(
                error => {
                  this.usersFound = false;
                  this.users = [];
                  this.error = error.data.message;
                  this.pages = 0;
                }
            );
      } else if (this.searchWord.length === 0) {
        await axios.get("/users/profiles", {
          params: {
            limit: this.limit,
            offset: this.offset
          }
        })
            .then(
                response => {
                  this.users = response.data;
                  this.usersFound = true;
                  this.getPagination(this.searchWord)
                }
            )
            .catch(
                error => {
                  this.usersFound = false;
                  this.users = [];
                  this.error = error.data.message;
                  this.pages = 0;
                }
            );
      }
    },
    async getPagination(searchWord) {
      if (searchWord.length > 0 && searchWord !== " ") {
        await axios.get("/users/count/" + searchWord)
            .then(response => {
              this.messageCount = response.data;
              this.pages = Math.ceil(this.messageCount / this.limit);
            })
            .catch(error => {
              console.log(error);
            });
      } else if (searchWord.length === 0) {
        await axios.get("/users/count")
            .then(response => {
              this.messageCount = response.data;
              this.pages = Math.ceil(this.messageCount / this.limit);
            })
            .catch(error => {
              console.log(error);
            });
      }
    },
    changePage(page) {
      this.offset = (page - 1) * this.limit;
      this.search();
    },
  },
  watch: {
    searchWord: function() {
      this.search();
    }
  }
}
</script>

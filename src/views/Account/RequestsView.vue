<template>
  <main class="d-flex flex-fill overflow-hidden">
    <div class="container d-flex flex-column flex-fill">
      <div class=" d-flex justify-content-center align-content-center flex-grow-1 overflow-hidden">
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row h-100">
          <div class="card rounded-0 h-100" style="width: 100%;">
            <div class="card-body p-3 pt-0 pb-0 h-100 overflow-visible">
              <div class="row">
                <h4 class="pt-3">Pending Requests</h4>
                <div class="col messages pt-2 pb-1 overflow-auto d-flex align-items-start flex-wrap" style="max-height: 25em;">
                  <pending-banner v-if="pendings.length > 0"
                                 v-for="pending in pendings"
                                 :key="pending.user_id"
                                 :user="pending"
                                 v-on:update-pending="updatePending(pending)"/>
                  <p style="width: 100%;" v-if="pendings.length <= 0">No pending requests at this moment!</p>
                </div>
                <h4 class="pt-3">Friend Requests</h4>
                <div class="col messages pt-2 pb-1 overflow-auto d-flex align-items-start flex-wrap" style="max-height: 25em;">
                  <request-banner v-if="requests.length > 0"
                                 v-for="request in requests"
                                 :key="request.user_id"
                                 :user="request"
                                 v-on:update-request="updateRequest(request)"/>
                  <p style="width: 100%;" v-if="requests.length <= 0">No requests at this moment!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth.js";
import RequestBanner from "@/components/requests/RequestBanner.vue";
import PendingBanner from "@/components/requests/PendingBanner.vue";

export default {
  name: "RequestsView",
  components: {RequestBanner, PendingBanner},
  data() {
    return {
      requests: [],
      pendings: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else {
      next();
    }
  },
  mounted() {
    this.getRequests();
    this.getPending();
  },
  methods: {
    async getRequests() {
      await axios.get("users/relations/" + useUserStore().userId + "/" + 0)
        .then((response) => {
          this.requests = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getPending() {
      await axios.get("users/relations/pending/" + useUserStore().userId)
        .then((response) => {
          this.pendings = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updatePending(pending) {
      this.pendings.splice(this.pendings.indexOf(pending), 1);
    },
    updateRequest(request) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
  },
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .container {
    padding: 0;
  }
}
</style>

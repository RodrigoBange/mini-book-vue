<template>
  <main class="d-flex flex-grow-1 flex-shrink-0 overflow-hidden">
    <div class="container d-flex flex-column">
      <div class="row d-flex justify-content-center align-content-center flex-grow-1 overflow-hidden">
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row h-100">
          <div class="card rounded-0 h-100" style="width: 100%;">
            <div class="card-body p-3 pt-0 pb-0 h-100 overflow-visible">
              <div class="row h-100">
                <h4 class="pt-3">Pending Requests</h4>
                <h4 class="pt-3">Friend Requests</h4>
                <div class="col messages pt-2 pb-1 overflow-auto h-100 d-flex justify-content-center align-items-start">
                  <request-banner v-if="requests.length > 0"
                                 v-for="request in requests"
                                 :key="request.user_id"
                                 :user="request"/>
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
export default {
  name: "RequestsView",
  components: {RequestBanner},
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    this.getRequests();
  },
  methods: {
    getRequests() {
      axios.get("users/relations/" + useUserStore().userId + "/" + 0)
        .then((response) => {
          this.requests = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>

<style scoped>

</style>
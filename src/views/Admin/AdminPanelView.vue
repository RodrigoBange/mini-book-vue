<template>
  <main class="gradient-form d-flex justify-content-center align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-xl-5">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-12">
                <div class="card-body p-md-3 mx-md-3">
                  <div class="text-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                         style="width: 185px;" alt="logo">
                    <h4 class="mt-1 mb-3 pb-1">Admin Control Panel</h4>
                  </div>
                  <div>
                    <h4>User Management</h4>
                    <router-link to="/admin/users" class="btn btn-outline-primary">Manage Users</router-link>
                  </div>
                  <div class="pt-2">
                    <h4>Message Management</h4>
                    <router-link to="/admin/messages" class="btn btn-outline-primary">Manage Messages</router-link>
                  </div>
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
import axios from "@/axios-auth";
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "AdminPanelView",
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else if (!useUserStore().getAdmin) {
      next("/");
    } else {
      next();
    }
  },
}
</script>

<style scoped>

</style>

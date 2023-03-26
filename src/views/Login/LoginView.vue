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
                    <h4 class="mt-1 mb-3 pb-1">Welcome to Mini Book</h4>
                  </div>
                  <form @submit.prevent="login">
                    <div class="form-outline mb-4">
                      <label class="form-label" for="email">Email</label>
                      <input type="email" v-model="user.email" class="form-control"
                             placeholder="Email address" required/>
                    </div>
                    <div class="form-outline mb-4">
                      <label class="form-label" for="password">Password</label>
                      <input type="password" v-model="user.password" class="form-control" placeholder="Password" required/>
                    </div>
                    <div class="text-center pt-1 mb-3 pb-1">
                      <button class="btn btn-primary btn-block fa-lg gradient" type="submit">Log
                        in</button>
                    </div>
                    <div class="d-flex align-items-center justify-content-center pb-4">
                      <p class="mb-0 me-2">Don't have an account?</p>
                      <router-link to="/register" type="button" class="btn btn-outline-secondary">Sign up</router-link>
                    </div>
                  </form>
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

export default {
  name: "LoginView",
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      useUserStore().login(this.user)
          .then((response) => {
            if (response.data.message === "Success")
            {
              console.log(response.data.message);
              this.$router.push({path: "/"});
            }
          }).catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

.gradient {
  /* fallback for old browsers */
  background: rgba(204,173,247,1);

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

@media (min-width: 769px) {
  .gradient {
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
  }
}
</style>
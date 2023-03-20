<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded bg-white p-3" v-if="dataFetched">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center">
            <img class="rounded-circle profile-pic" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
            <button class="btn btn-primary">Change picture</button>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mb-2">
              <div class="col-md-6"><label class="labels">Name</label>
                <input type="text" class="form-control" placeholder="Name" value="" name="first_name">
              </div>
              <div class="col-md-6"><label class="labels">Surname</label>
                <input type="text" class="form-control" placeholder="Surname" value="" name="last_name">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="row">
                  <div class="col-md-6">
                    <label class="labels">Gender</label>
                    <select class="form-select" aria-label="Default select example">
                      <option selected></option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Birthday</label>
                    <input type="date" class="form-control" value="" placeholder="birthdate"
                           required/>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Phone Number</label>
                <input type="text" class="form-control" placeholder="Phone number" value="" name="phone">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">City / Town</label>
                <input type="text" class="form-control" placeholder="City / Town" value="" name="city">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">State / Province</label>
                <input type="text" class="form-control" placeholder="State / Province" value="" name="state">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Country</label>
                <input type="text" class="form-control" placeholder="Country" value="" name="country">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3">
            <div class="spacer">
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Bio</label>
              <textarea type="text" class="form-control bio" placeholder="Write about yourself!" value=""></textarea>
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Socials</label>
              <textarea type="text" class="form-control socials" placeholder="Link your socials" value=""></textarea>
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Occupation</label>
              <input type="text" class="form-control" placeholder="Occupation" value="" name="occupation">
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Relationship Status</label>
              <select class="form-select" aria-label="Default select example">
                <option selected></option>
                <option value="1">Single</option>
                <option value="2">In a relationship</option>
                <option value="3">Engaged</option>
                <option value="4">Married</option>
                <option value="5">Divorced</option>
                <option value="6">Widowed</option>
                <option value="7">It's complicated</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="text-center d-flex col-md-9">
            <button class="btn btn-primary profile-button save-btn" type="button">Save changes</button>
            <router-link to="/profile" class="btn btn-outline-secondary" type="button">Cancel</router-link>
          </div>
        </div>

      </div>
    </div>
    <div v-else>Loading data...</div>
  </main>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "EditProfile",
  props: {
    id: Number
  },
  data() {
    return {
      user: null,
      dataFetched: false,
    }
  },
  mounted() {
    if (this.id !== useUserStore().userId) {
      this.$router.push({path: "/profile/" + useUserStore().userId});
    }

    this.getUser();
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else {
      next();
    }
  },
  methods: {
    getUser() {
      this.dataFetched = true;
    },
    saveChanges() {
      this.$router.push({path: "/profile"});
    }
  }
}
</script>

<style scoped>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

.save-btn {
  margin-left: 1.4em;
  margin-right: 1.5em;
}

.profile-pic {
  max-width: 150px;
  max-height: 150px;
  height: auto;
}

.bio {
  max-height: 33.6em;
}

.spacer {
  padding-bottom: 2.7em;
}

@media (max-width: 768px) {
  .spacer {
    padding-bottom: 0em;
  }
}
</style>
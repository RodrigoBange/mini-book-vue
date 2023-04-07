<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded-0 bg-white p-3 h-100" v-if="dataFetched">
      <form class="row h-100 overflow-auto" @submit.prevent="saveChanges">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center">
            <img class="rounded-circle profile-pic" :src="user.profile_picture">
            <button class="btn btn-primary" @click="changePicture">Change picture</button>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h4 class="text-right">Edit User (ID: {{id}})</h4>
            </div>
            <div class="row mb-2">
              <div class="col-md-6"><label class="labels">Name</label>
                <input type="text" class="form-control" placeholder="Name" v-model="user.first_name" name="first_name">
              </div>
              <div class="col-md-6"><label class="labels">Surname</label>
                <input type="text" class="form-control" placeholder="Surname" v-model="user.last_name" name="last_name">
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-2">
                <div class="row">
                  <div class="col-md-6">
                    <label class="labels">Gender</label>
                    <select class="form-select" aria-label="Default select example" v-model="selectedGender">
                      <option v-for="gender in genders" :value="gender" :key="gender.id">
                        {{ gender.gender }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="labels">Birthday</label>
                    <input type="date" class="form-control" v-model="user.birthdate" placeholder="birthdate"/>
                  </div>
                </div>
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Email</label>
                <input type="text" class="form-control" placeholder="Email" v-model="user.email" name="email">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Phone Number</label>
                <input type="text" class="form-control" placeholder="Phone number" v-model="user.phone" name="phone">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">City / Town</label>
                <input type="text" class="form-control" placeholder="City / Town" v-model="user.city" name="city">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">State / Province</label>
                <input type="text" class="form-control" placeholder="State / Province" v-model="user.state" name="state">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Country</label>
                <input type="text" class="form-control" placeholder="Country" v-model="user.country" name="country">
              </div>
              <div class="col-md-12 mb-2">
                <label class="labels">Languages</label>
                <textarea type="text" class="form-control languages" placeholder="Languages" v-model="user.languages" name="country"></textarea>
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
              <textarea type="text" class="form-control bio" placeholder="Write about yourself!" v-model="user.biography"></textarea>
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Socials</label>
              <textarea type="text" class="form-control socials" placeholder="Link your socials" v-model="user.socials"></textarea>
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Occupation</label>
              <input type="text" class="form-control" placeholder="Occupation" v-model="user.occupation" name="occupation">
            </div>
            <div class="col-md-12 mb-2">
              <label class="labels">Relationship Status</label>
              <select class="form-select" aria-label="Default select example" v-model="selectedRelationalStatus">
                <option v-for="status in relationshipStatuses" :value="status" :key="status.id">
                  {{ status.status }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row d-flex">
          <div class="col-md-3"></div>
          <div class="text-center d-flex col-md-9 align-items-start flex-wrap">
            <div class="d-flex m-2 flex-fill">
              <div class="alert alert-success w-50 m-2" v-if="success">
                Successfully updated!
              </div>
              <div class="alert alert-danger w-50 m-2" v-if="error">
                An error occurred! Please try again.
              </div>
            </div>
            <div class="w-100 d-flex">
              <button class="btn btn-primary profile-button save-btn" type="submit">Save changes</button>
              <router-link :to="'/admin/users'" class="btn btn-outline-secondary" type="button">Cancel</router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div v-else>Loading data...</div>
  </main>
</template>

<script>
import moment from "moment/moment";
import axios from "@/axios-auth";
import {useUserStore} from "@/stores/UserStore";

export default {
  name: "UserEditView",
  props: {
    id: Number
  },
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
      genders: [
        {gender: '', id: 0},
        {gender: 'Male', id: 1},
        {gender: 'Female', id: 2},
        {gender: 'Other', id: 3},
      ],
      selectedGender: 0,
      relationshipStatuses: [
        {status: '', id: 0},
        {status: 'Single', id: 1},
        {status: 'In a relationship', id: 2},
        {status: 'Engaged', id: 3},
        {status: 'Married', id: 4},
        {status: 'Divorced', id: 5},
        {status: 'Widowed', id: 6},
        {status: 'It\'s complicated', id: 7},
      ],
      selectedRelationalStatus: 0,
      dataFetched: false,
      moment: moment,
      success: false,
      error: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    }  else if (!useUserStore().getAdmin) {
      next("/");
    } else {
      next();
    }
  },
  mounted() {
    this.getUser().then(() => {
      this.getSelectedGender();
      this.getSelectedRelationalStatus();

      this.dataFetched = true;
    });
  },
  methods: {
    async getUser() {
      await axios.get("/users/" + this.id)
          .then(
              result => {
                this.user = result.data;
                this.dataFetched = true;
              }
          )
          .catch(
              error => console.log(error)
          );
    },
    getSelectedGender() {
      if (this.user.gender !== null){
        this.selectedGender = this.genders.find(i => i.gender === this.user.gender);
      } else {
        this.selectedGender = this.genders[0];
      }
    },
    getSelectedRelationalStatus() {
      if (this.user.relation_status !== null)
      {
        this.selectedRelationalStatus = this.relationshipStatuses.find(i => i.status === this.user.relation_status);
      } else {
        this.selectedRelationalStatus = this.relationshipStatuses[0];
      }
    },
    changePicture(e) {
      let picture = "/images/pfp_" + (Math.floor(Math.random() * (13 - 1) + 1)) + ".png";
      this.user.profile_picture = picture;
      e.preventDefault();
    },
    async saveChanges() {
      this.user.gender = this.selectedGender.gender;
      this.user.relation_status = this.selectedRelationalStatus.status;
      this.user.profile_picture = this.user.profile_picture;
      await axios.put("/users/" + this.id, this.user)
          .then(
              result => {
                console.log(result);
                this.success = true;
                this.error = false;
              }
          )
          .catch(
              error => {
                console.log(error)
                this.success = false;
                this.error = true;
              }
          );
    }
  }
}
</script>

<style scoped>
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

.languages {
  max-height: 10em;
}

@media (max-width: 768px) {
  .spacer {
    padding-bottom: 0;
  }
}
</style>

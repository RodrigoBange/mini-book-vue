<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded bg-white p-3">
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
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6"><label class="labels">Name</label>
                <input type="text" class="form-control" placeholder="first name" value="">
              </div>
              <div class="col-md-6"><label class="labels">Surname</label>
                <input type="text" class="form-control" value="" placeholder="surname">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Mobile Number</label>
                <input type="text" class="form-control" placeholder="enter phone number" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">Address 1</label>
                <input type="text" class="form-control" placeholder="Address 1" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">Address 2</label>
                <input type="text" class="form-control" placeholder="Address 2" value=""></div>
              <div class="col-md-12">
                <label class="labels">Postcode</label><input type="text" class="form-control" placeholder="Postal Code" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">State / Province</label>
                <input type="text" class="form-control" placeholder="State / Province" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">Region</label>
                <input type="text" class="form-control" placeholder="Region" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">Email</label>
                <input type="text" class="form-control" placeholder="Email" value="">
              </div>
              <div class="col-md-12">
                <label class="labels">Education</label>
                <input type="text" class="form-control" placeholder="education" value="">
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-6"><label class="labels">Country</label>
                <input type="text" class="form-control" placeholder="country" value="">
              </div>
              <div class="col-md-6"><label class="labels">State/Region</label>
                <input type="text" class="form-control" value="" placeholder="state">
              </div>
            </div>
            <div class="mt-5 text-center d-flex">
              <button class="btn btn-primary profile-button save-btn" type="button">Save changes</button>
              <router-link to="/" class="btn btn-outline-secondary" type="button">Cancel</router-link>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-center experience">
              <span>Edit Experience</span>
              <span class="border px-3 p-1 add-experience">
                <i class="fa fa-plus"></i>&nbsp;Experience
              </span>
            </div>
            <br>
            <div class="col-md-12">
              <label class="labels">Motto</label>
              <input type="text" class="form-control" placeholder="Motto" value="">
            </div>
            <br>
            <div class="col-md-12">
              <label class="labels">Bio</label>
              <textarea type="text" class="form-control bio" placeholder="Write about yourself!" value=""></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "EditProfile"
}
</script>

<style scoped>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}

.save-btn {
  margin-right: 1.5em;
}

.profile-pic {
  max-width: 150px;
  height: auto;
}

.bio {
  max-height: 33.6em;
}
</style>
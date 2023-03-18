<template>
  <main class="d-flex justify-content-center align-items-center">
    <div class="container rounded bg-white p-4">
      <div class="row">
        <div class="col-md-3 border-right">
          <div class="d-flex flex-column align-items-center text-center">
            <h4 class="text-right">Your name</h4>
            <img class="rounded-circle mt-0 profile-pic" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
            <span> </span>
          </div>
          <div class="col-md-12">
            <label class="labels">Mobile Number</label><br>
            <span><strong>+31 6 12345678</strong></span>
          </div>
          <div class="col-md-12">
            <label class="labels">Email</label><br>
            <span><strong>user@gmail.com</strong></span>
          </div>
          <div class="col-md-12">
            <label class="labels">Address 1</label><br>
            <span><strong>Street 8, 1920HR Haarlem</strong></span>
            <br>
            <span><strong>ZH, The Netherlands</strong></span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3">
            <div class="row">
              <div>
                This user has not posted anything yet.
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-3 py-5">
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
  name: "Profile"
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
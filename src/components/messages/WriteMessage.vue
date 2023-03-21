<template>
  <div class="row d-flex justify-content-center">
    <div class="col-md-12 col-lg-10 col-xl-8">
      <div class="card rounded-0 p-3">
        <div>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleComment">Close</button>
        </div>
        <label class="form-label m-2" for="textAreaExample">Write a new message</label>
        <textarea class="form-control" id="textAreaExample" rows="3" maxlength="1024"
                  style="background: #fff; max-height: 12em;"></textarea>
        <div class="float-start mt-2 pt-1">
          <button type="button" class="btn btn-primary btn-sm">Post message</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WriteMessage"
}
</script>

<style scoped>
</style>
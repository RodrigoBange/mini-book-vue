<template>
  <button class="btn" @click="toggleComment">
    <em class="fa fa-reply"></em>
    <span class="small text-black" v-if="!display">reply</span>
    <span class="small text-black" v-else>close</span>
  </button>
  <div class="border-0 pt-2" v-show="display">
    <div class="d-flex flex-start w-100">
      <img class="rounded-circle shadow-1-strong me-3"
           src="/images/blank_avatar.png" alt="avatar" width="65" height="65"
      />
      <div class="form-outline w-75">
        <label class="form-label" for="textAreaExample">Write a message</label>
        <textarea class="form-control" id="textAreaExample" rows="3" maxlength="1024"
                  style="background: #fff; max-height: 12em;"></textarea>
        <div class="float-start mt-2 pt-1">
          <button type="button" class="btn btn-primary btn-sm" style="margin-right: 1em;">Post comment</button>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleComment">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommentMessage",
  data: () => ({ display: false }),
  methods: {
    toggleComment() {
      this.display = !this.display;
    },
  }
}
</script>

<style scoped>

</style>
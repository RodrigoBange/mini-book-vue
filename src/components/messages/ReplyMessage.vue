<template>
  <div class="d-flex flex-start mt-4">
    <a class="me-3" href="#">
      <img class="rounded-circle shadow-1-strong"
           :src="replyMessage.profile_picture" alt="avatar"
           width="65" height="65" />
    </a>
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1">
            {{ replyMessage.user_name }} <span class="small">- {{ replyMessage.time_posted }}</span>
          </p>
        </div>
        <p class="small mb-0">
          {{ replyMessage.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyMessage",
  props: {
    replyMessage: {
      type: Object,
    }
  }
}
</script>

<style scoped>

</style>
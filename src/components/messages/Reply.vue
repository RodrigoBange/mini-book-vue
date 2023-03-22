<template>
  <div class="d-flex flex-start mt-4">
    <a class="me-3" href="#">
      <img class="rounded-circle shadow-1-strong"
           :src="reply.profile_picture" alt="avatar"
           width="65" height="65" />
    </a>
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <router-link to="'/profile/' + reply.user_id"
                       :key="reply.user_id"
                       style="text-decoration: none; color: inherit;">
            <p class="mb-1" v-if="reply.first_name !== null">
              {{ reply.first_name }} {{reply.last_name}}<span class="small"> - {{ timeAgo }} ago</span>
            </p>
            <p class="mb-1" v-else>
              {{ reply.email }}<span class="small"> - {{ timeAgo }} ago</span>
            </p>
          </router-link>
        </div>
        <p class="small mb-0">
          {{ reply.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ReplyMessage",
  props: {
    reply: {
      type: Object,
    },
    parentId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      timeAgo: moment.duration(moment(new Date()).diff(moment(this.reply.time_posted))).humanize(),
      messageId: this.reply.message_id,
    };
  },
  mounted() {
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
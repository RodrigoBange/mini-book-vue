<template>
  <div class="d-flex flex-start mb-3">
    <router-link :to="'/profile/' + message.user_id">
      <img class="rounded-circle shadow-1-strong me-3"
           :src="message.profile_picture" alt="avatar" width="65"
           height="65" />
    </router-link>
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <router-link :to="'/profile/' + message.user_id"
                       :key="message.user_id"
                       style="text-decoration: none; color: inherit;">
            <p class="mb-1" v-if="message.first_name !== null">
              {{message.first_name}} {{message.last_name}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
            <p class="mb-1" v-else>
              {{message.email}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
          </router-link>
        </div>
        <p class="small mb-0 pb-2">
          {{message.message}}
        </p>
      </div>

      <WriteReply
      :parentId="message.message_id"/>

      <Reply
          v-for="reply in replies"
          :key="reply.message_id"
          :reply="reply"
          :parentId="message.message_id"/>

    </div>
  </div>
</template>

<script>
import reply from "@/components/messages/Reply.vue";
import writeReply from "@/components/messages/WriteReply.vue";
import moment from "moment";
import axios from "@/axios-auth";

export default {
  name: "Message",
  components: {
    Reply: reply,
    WriteReply: writeReply,
  },
  props: {
    message: Object,
  },
  data() {
    return {
      replies: [],
      timeAgo: moment.duration(moment(new Date()).diff(moment(this.message.time_posted))).humanize(),
      messageId: this.message.message_id,
      timer: null,
    };
  },
  mounted() {
    this.getReplies();

    // Update feed every 20 seconds (Web sockets would have been better if I wasn't using MySQL)
    this.timer = setInterval(this.getReplies, 20000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    toggleComment() {
      writeReply.display = !writeReply.display;
    },
    getReplies() {
      axios.get("/messages/replies/" + this.messageId)
          .then(response => {
            this.replies = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
  },
}
</script>

<style scoped>

</style>
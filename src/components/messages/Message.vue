<template>
  <div class="d-flex flex-start mb-3">
    <img class="rounded-circle shadow-1-strong me-3"
         :src="message.profile_picture" alt="avatar" width="65"
         height="65" />
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <p class="mb-1">
            {{message.user_name}} <span class="small">- {{message.time_posted}}</span>
          </p>
        </div>
        <p class="small mb-0">
          {{message.message}}
        </p>
      </div>

      <CommentMessage />

      <ReplyMessage
          v-for="replyMessage in replyMessages"
          :key="replyMessage.message_id"
          :replyMessage="replyMessage" />


    </div>
  </div>
</template>

<script>
import replyMessage from "@/components/messages/ReplyMessage.vue";
import commentMessage from "@/components/messages/CommentMessage.vue";

export default {
  name: "Message",
  components: {
    ReplyMessage: replyMessage,
    CommentMessage: commentMessage,
  },
  props: {
    message: Object,
  },
  data() {
    return {
      replyMessages: [
        {
          message_id: 2,
          user_name: "Simona Disa",
          profile_picture: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp",
          time_posted: "3 hours ago",
          message: "Show me cats!"
        },
        {
          message_id: 3,
          user_name: "John Smith",
          profile_picture: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp",
          time_posted: "4 hours ago",
          message: "Show me dogs!"
        },
        {
          message_id: 4,
          user_name: "Lisa Cudrow",
          profile_picture: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp",
          time_posted: "5 hours ago",
          message: "Show me mice!"
        }
      ],
    };
  },
  methods: {
    toggleComment() {
      commentMessage.display = !commentMessage.display;
    },
  }
}
</script>

<style scoped>

</style>
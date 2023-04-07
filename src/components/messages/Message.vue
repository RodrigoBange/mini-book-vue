<template>
  <div class="d-flex flex-start mb-3">
    <router-link :to="'/profile/' + message.user_id"
                 :key="message.user_id">
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
            <p class="mb-1 text-break" v-if="message.first_name !== null">
              {{message.first_name}} {{message.last_name}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
            <p class="mb-1 text-break" v-else>
              {{message.email}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
          </router-link>
          <button class="btn" v-show="showDelete" v-if="!displayOnly" @click="deleteComment()">Delete</button>
        </div>
        <p class="small mb-0 pb-2">
          {{message.message}}
        </p>
      </div>

      <WriteReply
      v-if="!displayOnly"
      :parentId="message.message_id"/>

      <Reply
          v-for="reply in replies"
          :key="reply.message_id"
          :reply="reply"
          :parentId="message.message_id"
          v-on:refresh-feed="updateFeed"
          :display-only="displayOnly"
      />

    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import reply from "@/components/messages/Reply.vue";
import writeReply from "@/components/messages/WriteReply.vue";
import moment from "moment";
import axios from "@/axios-auth.js";

export default {
  name: "Message",
  components: {
    Reply: reply,
    WriteReply: writeReply,
  },
  props: {
    message: Object,
    displayOnly: Boolean,
  },
  data() {
    return {
      replies: [],
      timeAgo: moment.duration(moment(new Date()).diff(moment(this.message.time_posted))).humanize(),
      messageId: this.message.message_id,
      timer: null,
    };
  },
  async mounted() {
    await this.getReplies();

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
    async getReplies() {
      await axios.get("/replies/messages/" + this.messageId)
          .then(response => {
            this.replies = response.data;
          })
          .catch(error => {
            console.log(error);
          });
    },
    async deleteComment() {
      await axios.delete("/messages/" + this.messageId)
          .then(response => {
            if (response.data === true) {
              this.updateFeed();
            }
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
    updateFeed() {
      this.$emit("refresh-feed");
      this.getReplies();
    },
  },
  computed: {
    showDelete() {
      return this.message.user_id == useUserStore().userId;
    },
  },
}
</script>

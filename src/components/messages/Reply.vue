<template>
  <div class="d-flex flex-start mt-4">
    <router-link :to="'/profile/' + reply.user_id"
                 :key="reply.user_id" class="me-3" >
      <img class="rounded-circle shadow-1-strong"
           :src="reply.profile_picture" alt="avatar"
           width="65" height="65" />
    </router-link>
    <div class="flex-grow-1 flex-shrink-1">
      <div>
        <div class="d-flex justify-content-between align-items-center">
          <router-link :to="'/profile/' + reply.user_id"
                       :key="reply.user_id"
                       style="text-decoration: none; color: inherit;">
            <p class="mb-1 text-break" v-if="reply.first_name !== null">
              {{ reply.first_name }} {{reply.last_name}}<span class="small"> - {{ timeAgo }} ago</span>
            </p>
            <p class="mb-1 text-break" v-else>
              {{ reply.email }}<span class="small"> - {{ timeAgo }} ago</span>
            </p>
          </router-link>
          <button class="btn" v-show="showDelete" v-if="!displayOnly" @click="deleteReply()">Delete</button>
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
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth.js";

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
    displayOnly: Boolean,
  },
  data() {
    return {
      timeAgo: moment.duration(moment(new Date()).diff(moment(this.reply.time_posted))).humanize(),
      messageId: this.reply.message_id,
    };
  },
  methods: {
    async deleteReply() {
      await axios.delete("/replies/messages/" + this.reply.message_id)
        .then(response => {
          if (response.data === true) {
            this.$emit("refresh-feed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    showDelete() {
      return this.reply.user_id == useUserStore().userId;
    },
  },
}
</script>

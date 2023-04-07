<template>
  <div class="d-flex flex-start mb-3 w-100">
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
              {{message.message_id}}. {{message.first_name}} {{message.last_name}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
            <p class="mb-1 text-break" v-else>
              {{message.message_id}}. {{message.email}} <span class="small">-
              {{timeAgo}} ago</span>
            </p>
          </router-link>
        </div>
        <textarea type="text" class="form-control" v-model="message.message" style="max-height: 20em;"/>
        <div>
          <button class="btn btn-outline-primary" @click="updateComment()">Update</button>
          <button class="btn btn-outline-danger m-2" @click="deleteComment()">Delete</button>
        </div>
        <div class="alert alert-success w-50 p-2" v-if="success">
          Successfully updated!
        </div>
        <div class="alert alert-danger w-50 p-2" v-if="error">
          An error occurred! Please try again.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment/moment";
import axios from "@/axios-auth.js";

export default {
  name: "MessageBanner",
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeAgo: moment.duration(moment(new Date()).diff(moment(this.message.time_posted))).humanize(),
      messageId: this.message.message_id,
      success: false,
      error: false
    }
  },
  methods: {
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
    async updateComment() {
      await axios.put("/messages/" + this.messageId, this.message)
          .then(response => {
            if (response.data === true) {
              this.updateFeed();
              this.success = true;
              this.error = false;
            }
            console.log(response);
          })
          .catch(error => {
            console.log(error);
            this.error = true;
            this.success = false;
          });
    },
    updateFeed() {
      this.$emit("delete-message");
    },
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="d-flex justify-content-center justify-self-end"
       v-bind:class = "(showComment)?'expand':'shrink'">
    <div class="col-md-12 col-lg-10 col-xl-8 fillwidth">
      <div class="card rounded-0 p-3">
        <div class="d-flex">
          <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleComment">{{ buttonText }}</button>
          <button type="button" class="btn btn-outline-primary btn-sm" @click="refreshFeed">Refresh Feed</button>
        </div>
        <form @submit.prevent="postMessage">
          <textarea class="form-control mt-3" id="textAreaExample" rows="3" maxlength="1024" v-model="message.message"
                    style="background: #fff; max-height: 12em;"></textarea>
          <div class="float-start mt-2 pt-1">
            <button type="submit" class="btn btn-primary btn-sm">Post message</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import axios from "@/axios-auth";
import moment from 'moment';

export default {
  name: "WriteMessage",
  data() {
    return {
      showComment: false,
      buttonText: "Post a new message",
      message: {
        time_posted: "",
        message: "",
        user_id: "",
      },
      moment: moment,
    };
  },
  methods: {
    toggleComment() {
      this.showComment = !this.showComment;
      if (this.showComment) {
        this.buttonText = "Close";
      } else {
        this.buttonText = "Post a new message";
      }
    },
    async postMessage() {
      this.message.time_posted = this.moment().format("YYYY-MM-DD HH:mm:ss");
      this.message.user_id = useUserStore().userId;
      await axios.post("/messages", this.message)
          .then(
              result => {
                console.log(result);
                this.$emit("refresh-feed");
              }
          )
          .catch(
              error => console.log(error)
          );
    },
    refreshFeed() {
      this.$emit("refresh-feed");
    },
  }
}
</script>

<style scoped>
.expand {
  max-height: 23em;
  transition: max-height 0.15s ease-out;
}

.shrink {
  max-height: 3.8em;
  transition: max-height 0.15s ease-out;
}

@media screen and (max-width: 768px) {
  .fillwidth {
    width: 100%;
  }
}
</style>

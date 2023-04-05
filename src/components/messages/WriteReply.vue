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
          <form @submit.prevent="postReply">
            <label class="form-label" for="textAreaExample">Reply</label>
            <textarea class="form-control" id="textAreaExample" rows="3" maxlength="1024" v-model="message.message"
                      style="background: #fff; max-height: 12em;"></textarea>
            <div class="float-start mt-2 pt-1">
              <button type="submit" class="btn btn-primary btn-sm" style="margin-right: 1em;">Post comment</button>
              <button type="button" class="btn btn-outline-primary btn-sm" @click="toggleComment">Close</button>
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
  name: "CommentMessage",
  props: {
    parentId: {
      type: Number,
      required: true,
    },
  },
  data () {
    return {
      display: false,
      message: {
        time_posted: "",
        message: "",
        user_id: "",
      },
      userStore: useUserStore(),
      moment: moment,
    };
  },
  methods: {
    toggleComment() {
      this.display = !this.display;
    },
    async postReply() {
      this.message.time_posted = this.moment().format("YYYY-MM-DD HH:mm:ss");
      this.message.user_id = useUserStore().userId;
      await axios.post("/messages/replies/" + this.parentId, this.message)
          .then(
              result => {
                console.log(result);
                this.$parent.getReplies();
              }
          )
          .catch(
              error => console.log(error)
          );
    },
  }
}
</script>
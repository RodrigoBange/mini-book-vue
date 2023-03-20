<template>
<main>
    <div class="container h-100">
      <div class="row d-flex justify-content-center">
        <div class="col-md-12 col-lg-10 col-xl-8">
          <div class="card">
            <div class="card-body p-4">
              <h4 class="text-center mb-4 pb-2">Your feed</h4>

              <div class="row">
                <div class="col">
                  <message v-if="messages.length > 0"
                  v-for="message in messages"
                  :key="message.message_id"
                  :message="message"
                  />
                  <p v-if="messages.length <= 0">No messages at this moment!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div class="position-fixed fixed-bottom">test</div>
</main>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import Message from "@/components/messages/Message.vue";

export default {
  name: "Home",
  components: {
    Message,
  },
  data() {
    return {
      messages: [
        {
          message_id: 1,
          user_name: "Maria Samantha",
          profile_picture: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
          time_posted: "2 hours ago",
          message: "It is a long established fact that a reader will be distracted by the readable content of a page."
        },
        {
          message_id: 2,
          user_name: "Natalie Smith",
          profile_picture: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp",
          time_posted: "2 hours ago",
          message: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. " +
                  "Sections 1.10.32 and 1.10.33. "
        },
      ]
    };
  },
  mounted() {
    if (!useUserStore().getLoggedIn) {
      this.$router.push({path: "/login"});
    }
  }
}
</script>

<style scoped>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}
</style>
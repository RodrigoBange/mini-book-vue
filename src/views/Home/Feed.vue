<template>
<main class="d-flex">
    <div class="container d-flex flex-column">
      <div class="row d-flex justify-content-center flex-grow-1 flex-column align-content-center overflow-auto">
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row">
          <div class="card rounded-0">
            <div class="card-body p-3 pt-0">
              <div class="row h-100">
                <div class="col overflow-auto messages pt-3 overflow-auto">
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
      <write-message />
    </div>
</main>
</template>

<script>
import {useUserStore} from "@/stores/UserStore";
import Message from "@/components/messages/Message.vue";
import WriteMessage from "@/components/messages/WriteMessage.vue";
import Footer from "@/App.vue";

export default {
  name: "Home",
  components: {
    Footer,
    Message,
    WriteMessage,
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
        {
          message_id: 3,
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

<style>
#app {
  height: 100vh;
}

nav {
  flex-grow: 0;
}

footer {
  bottom: 0;
}

main {
  flex-grow: 1;
  overflow: auto;
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
}


.messages {
  height: 100%;
}
</style>
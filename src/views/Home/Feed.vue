<template>
<main class="d-flex flex-grow-1 flex-shrink-0 overflow-hidden">
    <div class="container d-flex flex-column">
      <div class="row d-flex justify-content-center align-content-center flex-grow-1 overflow-hidden">
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-row h-100">
          <div class="card rounded-0 h-100" style="width: 100%;">
            <div class="card-body p-3 pt-0 pb-0 h-100 overflow-visible">
              <div class="row h-100">
                <div class="col messages pt-3 pb-1 overflow-auto h-100">
                  <message v-if="messages.length > 0"
                  v-for="message in messages"
                  :key="message.message_id"
                  :message="message"
                  />
                  <p style="width: 100%;" v-if="messages.length <= 0">No messages at this moment!</p>
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
import axios from "@/axios-auth.js";

export default {
  name: "Home",
  components: {
    Footer,
    Message,
    WriteMessage,
  },
  data() {
    return {
      messages: [],
      timer: null,
    };
  },
  mounted() {
    if (!useUserStore().getLoggedIn) {
      this.$router.push({path: "/login"});
    }

    this.getMessages();

    // Update feed every 20 seconds (Web sockets would have been better if I wasn't using MySQL)
    this.timer = setInterval(this.getMessages, 20000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    getMessages() {
      axios.get("/messages/" + useUserStore().userId)
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>

<style>
main {
  background: rgb(196,235,253);
  background: linear-gradient(145deg, rgba(196,235,253,1) 0%, rgba(204,173,247,1) 100%);
  max-height: 95vh;
}

.messages {
  height: 100%;
}
</style>
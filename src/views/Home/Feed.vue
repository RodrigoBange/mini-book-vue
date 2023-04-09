<template>
<main class="d-flex flex-fill overflow-hidden">
    <div class="container d-flex flex-column flex-fill">
      <div class="flex-column d-flex justify-content-center align-items-center overflow-hidden flex-fill">
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex flex-fill overflow-hidden fillwidth">
          <div class="card rounded-0 h-100" style="width: 100%;">
            <div class="card-body p-3 pt-0 pb-0 h-100 overflow-visible">
              <div class="row h-100">
                <div class="col messages pt-3 pb-1 overflow-auto h-100">
                  <message v-if="messages.length > 0"
                  v-for="message in messages"
                  :key="message.message_id"
                  :message="message"
                  v-on:refresh-feed="updateFeed"
                  :display-only="false"
                  />
                  <p style="width: 100%;" v-if="messages.length <= 0">No messages at this moment!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-10 col-xl-8 d-flex justify-content-end fillwidth">
          <nav aria-label="navigation" class="bg-white" style="width: 100%;">
            <ul class="pagination m-0">
              <li class="page-item">
                <button class="page-link rounded-0" aria-label="Previous" @click="changePage(1)">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li v-for="page in pages" class="page-item">
                <button class="page-link rounded-0" @click="changePage(page)">{{page}}</button>
              </li>
              <li class="page-item">
                <button class="page-link rounded-0" aria-label="Next" @click="changePage(Math.ceil(messageCount / limit))">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <write-message v-on:refresh-feed="updateFeed"/>
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
      messageCount: 0,
      timer: null,
      limit: 5,
      offset: 0,
      pages: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!useUserStore().getLoggedIn) {
      next("/login");
    } else {
      next();
    }
  },
  async mounted() {
    await this.updateFeed();

    // Update feed every 20 seconds (Web sockets would have been better if I wasn't using MySQL)
    this.timer = setInterval(this.updateFeed, 20000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
  methods: {
    updateFeed() {
      this.getMessages();
      this.getPagination();
    },
    async getMessages() {
      await axios.get("/users/messages/" + useUserStore().userId, {
        params: {
          limit: this.limit,
          offset: this.offset,
        }
      })
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getPagination() {
      await axios.get("/users/messages/" + useUserStore().userId)
        .then(response => {
          let result = response.data;
          this.messageCount = result.length;
          this.pages = Math.ceil(this.messageCount / this.limit);
        })
        .catch(error => {
          console.log(error);
        });
    },
    changePage(page) {
      this.offset = (page - 1) * this.limit;
      this.getMessages();
    },
  },
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

@media screen and (max-width: 768px) {
  .container {
    padding: 0;
  }

  .fillwidth {
    width: 100%;
  }
}
</style>

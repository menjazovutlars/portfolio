<template>
  <v-app>
    <v-container fill-height>
      <component v-bind:is="displayedMessage"></component>
    </v-container>
  </v-app>
</template>

<script>
import FirstMessage from "./chatmessages/FirstMessage.vue";
import SecondMessage from "./chatmessages/SecondMessage.vue";
import ThirdMessage from "./chatmessages/ThirdMessage.vue";
import FourthMessageA from "./chatmessages/FourthMessageA.vue";
import FourthMessageB from "./chatmessages/FourthMessageB.vue";
export default {
  name: "TextBox",
  components: {
    FirstMessage,
    SecondMessage,
    ThirdMessage,
    FourthMessageA,
    FourthMessageB,
  },
  data: function () {
    return {
      firstMessage: "FirstMessage",
      secondMessage: "SecondMessage",
      thirdMessage: "ThirdMessage",

      fourthMessageA: "FourthMessageA",
      fourthMessageB: "FourthMessageB",
      displayedMessage: "FirstMessage",
    };
  },
  created() {
    this.$root.$refs.TextBox = this;
  },
  mounted() {
    /**setTimeout(() => {
      this.displayedMessage = this.secondMessage;
      this.$root.$refs.ContentBox.setIcon("mdi-human-male-board");
    }, 1000);
    setTimeout(() => {
      this.displayedMessage = this.thirdMessage;
      this.$root.$refs.ContentBox.setIcon("mdi-video");
    }, 2000);
    */
  },
  methods: {
    changeMessage: function (message, icon) {
      this.displayedMessage = message;
      this.$root.$refs.ContentBox.setIcon(icon);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon__intro {
  font-size: 20rem !important;
}

.text-container {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

::-webkit-scrollbar {
  width: 0px;
  /* Remove scrollbar space */
  background: transparent;
  /* Optional: just make scrollbar invisible */
}
</style>

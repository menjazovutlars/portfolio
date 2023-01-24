<template>
  <v-app>
    <v-container fill-height fluid>
      <component v-bind:is="displayedMessage"></component>
    </v-container>
  </v-app>
</template>

<script>
import FirstMessage from "./chatmessages/FirstMessage.vue";
import SecondMessage from "./chatmessages/SecondMessage.vue";
import ThirdMessage from "./chatmessages/ThirdMessage.vue";
import FourthMessage from "./chatmessages/FourthMessage.vue";
import FifthMessageA from "./chatmessages/FifthMessageA.vue";
import FifthMessageB from "./chatmessages/FifthMessageB.vue";
export default {
  name: "TextBox",
  components: {
    FirstMessage,
    SecondMessage,
    ThirdMessage,
    FourthMessage,
    FifthMessageA,
    FifthMessageB,
  },
  data: function () {
    return {
      firstMessage: "FirstMessage",
      secondMessage: "SecondMessage",
      thirdMessage: "ThirdMessage",
      fourthMessage: "FourthMessage",
      fifthMessageA: "FifthMessageA",
      fifthMessageB: "FifthMessageB",
      displayedMessage: "FirstMessage",
    };
  },
  mounted() {
    setTimeout(() => {
      this.displayedMessage = this.secondMessage;
      this.$root.$refs.ContentBox.setIcon("mdi-human-male-board");
    }, 1000);
    setTimeout(() => {
      this.displayedMessage = this.thirdMessage;
      this.$root.$refs.ContentBox.setIcon("mdi-video");
    }, 2000);
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

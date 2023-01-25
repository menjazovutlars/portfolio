<template>
  <v-container>
    <p class="black--text body-1 intro__subtitle">
      Before we start I want to tell you about the funny gimmick I came up with
      to make myself feel special. For this you will need a functioning and
      connected webcam.
    </p>
    <p class="black--text body-1 intro__subtitle">
      Do you have a webcam connected?
    </p>
    <v-container d-flex justify-space-around v-bind:style="{ padding: 0 }">
      <v-btn text color="green" x-large @click="checkWebCam">
        <v-icon left default> mdi-check-bold </v-icon>
        <span>Yes, I have.</span></v-btn
      >
      <v-btn text color="red" x-large @click="nextMessageB">
        <v-icon left default> mdi-close</v-icon>
        <span>No, I haven't.</span></v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "ThirdMessage",
  methods: {
    nextMessageA: function () {
      this.$root.$refs.TextBox.changeMessage(
        this.$root.$refs.TextBox.fourthMessageA,
        "mdi-thumb-up"
      );
    },
    nextMessageB: function () {
      this.$root.$refs.TextBox.changeMessage(
        this.$root.$refs.TextBox.fourthMessageB,
        "mdi-thumb-up"
      );
    },
    checkWebCam: function () {
      this.nextMessageA();
      setTimeout(() => {
        this.$root.$refs.WebCam.toggleWebcam();
        this.$root.$refs.ContentBox.state.showing = true;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped></style>

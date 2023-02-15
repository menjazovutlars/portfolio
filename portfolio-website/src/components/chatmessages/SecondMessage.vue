<template>
  <v-container>
    <p class="black--text body-1 intro__subtitle">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nihil
      alias ullam vitae, ipsa voluptas obcaecati eligendi. Eos numquam, nam
      facere pariatur esse asperiores iure quia quo perspiciatis rerum
      consequatur!
    </p>
    <v-btn text @click="nextMessage" class="nextButton">
      <span>Next</span>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "SecondMessage",
  methods: {
    nextMessage: function () {
      this.$root.$refs.TextBox.changeMessage(
        this.$root.$refs.TextBox.thirdMessage,
        "mdi-video"
      );
      this.$root.$refs.CanvasBG.cameraReveal();
      this.$root.$refs.ProjectPageCenter.topRow = true;
      this.$root.$refs.ProjectPageCenter.centerRow = false;
      this.$root.$refs.StageBG.activateAnimation = true;
      this.$root.$refs.StartPage.toRightAnimation = true;

      setTimeout(() => {
        this.$root.$refs.StageBG.fullWhiteBackground = false;
        this.$root.$refs.StageBG.activateAnimation = false;
        this.$root.$refs.StartPage.toRight = true;
        this.$root.$refs.StartPage.toRightAnimation = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.nextButton {
  margin-bottom: -80px;
}
</style>

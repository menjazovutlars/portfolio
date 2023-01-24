<template>
  <v-container>
    <h1 class="black--text text-h1">Hey there!</h1>
    <v-btn text @click="nextMessage" class="nextButton">
      <span>Next</span>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: "FirstMessage",
  methods: {
    nextMessage: function () {
      this.$root.$refs.TextBox.changeMessage(
        this.$root.$refs.TextBox.secondMessage,
        "mdi-human-male-board"
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.nextButton {
  margin-bottom: -80px;
}
</style>

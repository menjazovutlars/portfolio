<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row align="center" justify="center">
      <v-col :class="[colsTextBox.col6 ? 'col-6' : 'col-4']">
        <component v-bind:is="compTextBox"></component>
      </v-col>
      <v-col :class="[colsContBox.col6 ? 'col-6' : 'col-4']">
        <component v-bind:is="compContBox"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TextBox from "../TextBox.vue";
import ContentBox from "../ContentBox.vue";
import StartPage from "../StartPage.vue";

export default {
  extends: StartPage,
  name: "ProjectPageCenter",
  components: {
    TextBox,
    ContentBox,
  },
  data() {
    return {
      compTextBox: "TextBox",
      compContBox: "ContentBox",

      timer: function (miliseconds, action) {
        setTimeout(action, miliseconds);
      },
      colsContBox: {
        col6: true,
      },
      colsTextBox: {
        col6: true,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>

<template lang="">
  <v-app>
    <v-container fill-height fluid d-flex justify center id="stage">
      <v-row align="center" justify="center">
        <v-col :class="[colsTextBox.col6 ? 'col-6' : 'col-4']">
          <keep-alive>
            <component v-bind:is="compTextBox"></component>
          </keep-alive>
        </v-col>
        <v-col :class="[colsContBox.col6 ? 'col-6' : 'col-4']">
          <keep-alive>
            <component v-bind:is="compContBox"></component>
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import TextBox from "./TextBox.vue";
import ContentBox from "./ContentBox.vue";

export default {
  name: "StartPage",
  components: { TextBox, ContentBox },
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
  created() {
    this.$root.$refs.StartPage = this;
  },
};
</script>
<style scoped>
#stage {
  max-width: 70%;
}
</style>

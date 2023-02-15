<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row
      justify="center"
      :class="[inFront, centerRow ? 'center-row' : '', topRow ? 'top-row' : '']"
    >
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
import TextBox from "@/components/TextBox.vue";
import ContentBox from "@/components/ContentBox.vue";
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "ProjectPageCenter",
  components: {
    TextBox,
    ContentBox,
  },
  data() {
    return {
      room: "Center",
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
      centerRow: true,
      topRow: false,
      inFront: "in-front",
    };
  },
  created() {
    this.$root.$refs.ProjectPageCenter = this;
  },
};
</script>

<style lang="scss" scoped>
.in-front {
  z-index: 1000;
}

.center-row {
  align-items: center !important;
}

.top-row {
  align-items: center !important;
  animation: float-up ease-in-out 3s 0s 1;
}

@keyframes float-up {
  0% {
    margin-left: 0;
  }

  100% {
    margin-left: 50vw;
  }
}
</style>

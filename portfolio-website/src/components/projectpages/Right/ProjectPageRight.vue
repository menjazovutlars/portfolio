<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row no-gutters justify="center" :class="[inFront, topRow]">
      <v-col class="col-12">
        <h1>{{ room }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "ProjectPageRight",
  data() {
    return {
      room: "Project 2",
      topRow: "top-row",
      inFront: "in-front",
    };
  },
  created() {
    this.$root.$refs.ProjectPageRight = this;
  },
};
</script>

<style lang="scss" scoped>
.in-front {
  z-index: 1000;
}

.top-row {
  align-items: center !important;
  margin-bottom: 50vh;
}
</style>

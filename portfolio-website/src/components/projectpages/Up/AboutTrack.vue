<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row justify="center" :class="['in-front', 'top-row']">
      <v-col>
        <h1>{{ room }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "AboutTrack",
  data() {
    return { room: "Project 1" };
  },
  created() {
    this.$root.$refs.AboutTrack = this;
  },
};
</script>

<style lang="scss" scoped>
.citation {
  font-size: 8em;
  margin-top: -120px;
}

.citation-row {
  align-content: center;
}

.in-front {
  z-index: 1000;
}

.top-row {
  align-items: center !important;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

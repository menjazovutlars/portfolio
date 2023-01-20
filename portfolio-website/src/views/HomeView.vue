<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <NavBar />
    <StartPage />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import StartPage from "@/components/StartPage.vue";

export default {
  name: "HomePage",

  components: {
    NavBar,
    StartPage,
  },
};
</script>

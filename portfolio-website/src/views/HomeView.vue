<template>
  <v-app
    :style="{
      background: $vuetify.theme.themes.dark.background,
      overflow: 'hidden',
      height: '100vh',
    }"
  >
    <NavBar v-show="false" />
    <StartPage />
    <VideoBoxOffscreen class="videoBoxOffscreen" />
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import StartPage from "@/components/StartPage.vue";
import VideoBoxOffscreen from "@/components/VideoBoxOffscreen.vue";

export default {
  name: "HomePage",

  components: {
    NavBar,
    StartPage,
    VideoBoxOffscreen,
  },
};
</script>

<style lang="scss" scoped>
.videoBoxOffscreen {
  max-width: 640px;
  max-height: 480px;
  visibility: hidden;
  transform: translate(-500px);
}
</style>

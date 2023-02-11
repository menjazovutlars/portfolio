<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row justify="center" class="in-front top-row">
      <v-col>
        <iframe
          src="https://player.vimeo.com/video/513146351?h=4205110b8f"
          width="640"
          height="360"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p>
          <a href="https://vimeo.com/513146351">v10-last but not least</a> from
          <a href="https://vimeo.com/user131220007">L D</a> on
          <a href="https://vimeo.com">Vimeo</a>.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "TrailerTrack",
  data() {
    return {};
  },
  created() {
    this.$root.$refs.TrailerTrack = this;
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
  max-height: 50vh;
}
</style>

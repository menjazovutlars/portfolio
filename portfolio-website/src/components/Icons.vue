<template>
  <v-icon color="black" size="200" class="icon__intro waving-hand" x- large>
    {{ icon }}</v-icon
  >
</template>

<script>
import anime from "animejs/lib/anime.es.js";
export default {
  name: "IconBox",
  props: ["icon"],
  data() {
    return {
      icons: {
        hand: "fa-solid fa-hand",
        camera: "fa-solid fa-video",
      },
      timer: function (miliseconds, action) {
        setTimeout(action, miliseconds);
      },
      morphIcons: function (targetA, targetB) {
        anime({
          targets: [targetA, targetB],
          translateY: ["-15", "0"],
          opacity: ["0", "1"],
          easing: "easeInOutSine",
          delay: anime.stagger(200),
          autoplay: false,
          // loop: false
          duration: 500,
          complete: function () {},
        });
      },
    };
  },
  mounted: function () {
    //this.timer(4000, this.morphIcons(".waving-hand", ".camera"));
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>

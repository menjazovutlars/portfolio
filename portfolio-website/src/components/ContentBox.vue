<template>
  <v-app>
    <v-container fill-height fluid>
      <Icons icon="fa-solid fa-video"></Icons>
      <MorphingIcons class="waving-hand"></MorphingIcons>
    </v-container>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="hand">
      <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
      <path
        class="icon__intro"
        d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"
      />
    </svg>
  </v-app>
</template>

<script>
import Icons from "./Icons.vue";
import MorphingIcons from "./MorphingIcons.vue";
export default {
  name: "ContentBox",
  components: {
    Icons,
    MorphingIcons,
  },
  data() {
    return {
      icons: {
        hand: "fa-solid fa-hand",
        camera: "fa-solid fa-video",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.icon__intro {
  font-size: 20rem !important;
}

.waving-hand {
  animation: wave ease-in-out 2s 0.8s 2;
  transform-origin: 50% 100%;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(16deg);
  }

  20% {
    transform: rotate(-6deg);
  }

  30% {
    transform: rotate(16deg);
  }

  40% {
    transform: rotate(-4deg);
  }

  50% {
    transform: rotate(16deg);
  }

  60% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>

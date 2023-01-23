<template>
  <v-app>
    <v-container fill-height fluid>
      <Icons v-bind:icon="icons.hand"></Icons>
    </v-container>
  </v-app>
</template>

<script>
import Icons from "./Icons.vue";
//import MorphingIcons from "./MorphingIcons.vue";
export default {
  name: "ContentBox",
  components: {
    Icons,
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

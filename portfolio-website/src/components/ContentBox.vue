<template>
  <v-container fill-height fluid :class="{ hideOverflow: state.overflow }">
    <Icons
      v-bind:icon="icons.currentIcon"
      :class="{
        'waving-hand': state.wavingHand,
        'icon-rotation__out': state.rotateOut,
        'icon-rotation__in': state.rotateIn,
      }"
    ></Icons>
    <WebCam></WebCam>
  </v-container>
</template>

<script>
import Icons from "./Icons.vue";
import WebCam from "./WebCam.vue";
//import MorphingIcons from "./MorphingIcons.vue";
export default {
  name: "ContentBox",
  components: {
    Icons,
    WebCam,
  },
  data() {
    return {
      icons: {
        currentIcon: "mdi-hand-wave",
        hand: "mdi-hand-wave",
        camera: "fa-solid fa-video",
        class: {
          rotationOut: "icon-rotation__out",
          rotationIn: "icon-rotation__in",
        },
      },
      state: {
        rotateOut: false,
        rotateIn: false,
        wavingHand: true,
        overflow: false,
      },
    };
  },
  created() {
    this.$root.$refs.ContentBox = this;
  },
  methods: {
    toggleIconRotation: function () {
      this.state.wavingHand = false;
      this.state.rotateOut = true;
      setTimeout(() => {
        this.state.rotateOut = false;
        this.state.rotateIn = true;
        setTimeout(() => {
          this.state.rotateIn = false;
        }, 1000);
      }, 1000);
    },
    setIcon: function (newIcon) {
      this.state.overflow = true;
      this.state.wavingHand = false;
      this.state.rotateOut = true;
      setTimeout(() => {
        this.state.rotateOut = false;
        this.icons.currentIcon = newIcon;
        this.state.rotateIn = true;

        setTimeout(() => {
          this.state.rotateIn = false;
        }, 400);
      }, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
.hideOverflow {
  overflow: hidden;
}
.icon__intro {
  color: black;
}

.waving-hand {
  animation: wave ease-in-out 2s 0.8s 2;
  transform-origin: 50% 100%;
}

.icon-rotation__out {
  transform-origin: 50% 150%;
  animation: rotation-out ease-in 0.4s 0s;
}

.icon-rotation__in {
  transform-origin: 50% 150%;
  animation: rotation-in ease-out 0.4s 0s;
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

@keyframes rotation-out {
  0% {
    //transform: rotate(0deg);
    transform: translateY(0px);
  }

  50% {
    opacity: 100%;
  }

  100% {
    // transform: rotate(-180deg);
    transform: translateY(-200px);
    opacity: 100%;
  }
}

@keyframes rotation-in {
  0% {
    transform: translateY(200px);
    //transform: rotate(-180deg);
  }

  50% {
    opacity: 100%;
  }

  100% {
    //transform: rotate(-360deg);
    transform: translateY(0px);
    opacity: 100%;
  }
}
</style>

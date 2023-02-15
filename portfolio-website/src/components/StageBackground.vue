<template>
  <div
    id="stage-bg"
    :class="[
      fullWhiteBackground ? 'white-bg' : 'half-white',
      activateAnimation ? 'background-animation' : '',
    ]"
  ></div>
</template>

<script>
export default {
  name: "StageBG",
  data() {
    return {
      fullWhiteBackground: true,
      activateAnimation: false,
    };
  },
  created() {
    this.$root.$refs.StageBG = this;
  },
};
</script>

<style lang="scss" scoped>
#stage-bg {
  position: fixed;
}
.white-bg {
  background-color: transparent;
}

.white-bg::after {
  position: fixed;
  content: "";
  background-color: white;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.half-white {
  background-color: transparent;
  width: 50vw;
  align-items: flex-start;
  left: 50vw;
  right: 0;
  top: 0;
  bottom: 0;
}

.background-animation {
  background-color: transparent;
}

.background-animation::after {
  position: fixed;
  content: "";
  background-color: white;
  right: 0;
  top: 0;
  bottom: 0;
  animation: reveal-canvas ease-in-out 3s 0s 1 forwards;
  pointer-events: none;
}

.half-white::after {
  position: fixed;
  content: "";
  background-color: white;
  left: 50vw;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

@keyframes reveal-canvas {
  0% {
    left: 0;
  }

  100% {
    left: 50vw;
  }
}
</style>

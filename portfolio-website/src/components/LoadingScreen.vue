<template>
  <v-container
    d-flex
    full-height
    fluid
    justify-center
    align-center
    class="loading-container"
  >
    <span class="loader"></span>
  </v-container>
</template>

<script>
export default {
  name: "LoadingScreen",
  data() {
    return {};
  },
  created() {
    this.$root.$refs.LoadingScreen = this;
  },
  mounted() {},
  methods: {
    update: function () {
      const status = WebGLRenderingContext.checkFramebufferStatus();
      console.log(status);
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: fixed;
  width: 50vw;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0;
}
.loader {
  width: 128px;
  height: 128px;
  display: inline-block;
  position: fixed;
}
.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 10px solid #fff;
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>

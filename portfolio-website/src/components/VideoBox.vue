<template>
  <video ref="video" autoplay class="camera-feed" id="camera-feed"></video>
</template>

<script>
export default {
  name: "VideoBox",
  data: function () {
    return {};
  },
  created() {
    this.$root.$refs.VideoBox = this;
    this.$root.$refs.VideoBox.video = this.$refs.video;
  },
};
</script>

<style lang="scss" scoped></style>

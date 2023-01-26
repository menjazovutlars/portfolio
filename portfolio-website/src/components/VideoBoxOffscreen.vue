<template>
  <keep-alive>
    <video ref="video" autoplay class="camera-feed"></video>
  </keep-alive>
</template>

<script>
export default {
  name: "VideoBoxOffscreen",
  data: function () {
    return {};
  },
  created() {
    this.$root.$refs.VideoBoxOffscreen = this;
    this.$root.$refs.VideoBoxOffscreen.video = this.$refs.video;
  },
};
</script>

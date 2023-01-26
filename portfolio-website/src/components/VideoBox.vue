<template>
  <keep-alive>
    <video ref="video" autoplay class="camera-feed" id="camera-feed"></video>
  </keep-alive>
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

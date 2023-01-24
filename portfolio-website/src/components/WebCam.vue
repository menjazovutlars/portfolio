<template>
  <v-container full-height fluid>
    <video v-show="true" ref="video" autoplay></video>
    <canvas id="webcamCanvas"> </canvas>
  </v-container>
</template>

<script>
export default {
  name: "WebCam",
  data() {
    return {
      isWebcamConnected: false,
      isWebcamOpen: false,
      isLoading: false,
      isTensorflowLoaded: false,
    };
  },
  created() {
    this.$root.$refs.WebCam = this;
  },
  methods: {
    toggleWebcam() {
      if (this.isWebcamConnected) {
        this.isWebcamConnected = false;
        this.isWebcamOpen = false;
        this.stopWebcamStream();
      } else {
        this.isWebcamConnected = true;
        this.createWebcamElement();
      }
    },
    createWebcamElement() {
      this.isLoading = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true,
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          console.log(stream);
          this.isLoading = false;
          this.$refs.video.srcObject = stream;
          const canvas = document.getElementById("webcamCanvas"),
            context = canvas.getContext("2d");
          this.$refs.video.play();
          console.log(this.$refs.video);
          context.drawImage(this.$refs.video, 0, 0);
        })
        .catch((err) => {
          this.isLoading = false;
          alert("Something went wrong with the webcam." + err);
        });
    },
    stopWebcamStream() {
      let tracks = this.$refs.video.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#webcamCanvas {
  width: 310px;
  height: 250px;
}
</style>

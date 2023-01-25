<template>
  <v-container full-height fluid>
    <video ref="video" autoplay></video>
    <canvas v-show="false" id="webcamCanvas"> </canvas>
  </v-container>
</template>

<script>
import MotionCapture from "@/plugins/motionCapture";
import * as fingerpose from "../plugins/fingerpose";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as posenet from "@tensorflow-models/posenet";

export default {
  name: "WebCam",
  data() {
    return {
      isWebcamConnected: false,
      isWebcamOpen: false,
      isLoading: false,
      isTensorflowLoaded: false,
      isShowing: false,
      motionCapture: "",
    };
  },
  created() {
    this.$root.$refs.WebCam = this;
  },
  mounted() {},
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
          /*const canvas = document.getElementById("webcamCanvas"),
            context = canvas.getContext("2d");
          createImageBitmap(stream).then((video) => {
            console.log(video);
            context.drawImage(video, 0, 0);
          });*/
        })
        .then(() => {
          this.startMotionCapture();
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
    startMotionCapture() {
      this.motionCapture = new MotionCapture(
        document,
        navigator,
        this.$refs.video,
        posenet,
        handpose,
        tf,
        fingerpose
      );
      console.log("asdsajkhasdhjk");
      this.motionCapture.captureMotion();
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

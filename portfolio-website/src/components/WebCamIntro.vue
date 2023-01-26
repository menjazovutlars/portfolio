<template>
  <v-container full-height fluid id="WebCamContainer">
    <VideoBox></VideoBox>
  </v-container>
</template>

<script>
import * as fp from "../plugins/fingerpose";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import VideoBox from "./VideoBox.vue";

export default {
  name: "WebCam",
  components: {
    VideoBox,
  },
  data() {
    return {
      isWebcamConnected: false,
      isWebcamOpen: false,
      isLoading: false,
      isTensorflowLoaded: false,
      isShowing: false,
      motionCapture: "",
      GE: "",
      fingerJoints: {
        thumb: [0, 1, 2, 3, 4],
        indexFinger: [0, 5, 6, 7, 8],
        middleFinger: [0, 9, 10, 11, 12],
        ringFinger: [0, 13, 14, 15, 16],
        pinky: [0, 17, 18, 19, 20],
      },
      estimatedGesture: "",
      interval: "",
      streamOutput: {},
      canvas: "",
      video: "",
      videoOffscreen: "",
      gesture: "",
      sounds: "",
      webCamContainer: "",
      estimatedDirection: "",
    };
  },
  created() {
    this.$root.$refs.WebCam = this;
    window.addEventListener("resize", () => {
      this.resizeCameraAndCanvas();
    });
  },
  mounted() {
    this.canvas = this.$root.$refs.Canvas;
    this.video = this.$root.$refs.VideoBox.$refs.video;
    this.videoOffscreen = this.$root.$refs.VideoBoxOffscreen.$refs.video;
    this.gesture = this.$root.$refs.Canvas.gesture;
    this.sounds = this.$root.$refs.sounds;
    this.defineHandGestures();
    this.webCamContainer = document.getElementById("WebCamContainer");
  },
  methods: {
    resizeCameraAndCanvas() {
      this.video.width = this.webCamContainer.offsetWidth;
      this.$root.$refs.Canvas.resizeCanvas(
        this.$root.$refs.VideoBox.$refs.video
      );
    },

    toggleWebcam() {
      if (this.isWebcamConnected) {
        this.isWebcamConnected = false;
        this.isWebcamOpen = false;
        //this.stopWebcamStream();
      } else {
        this.isWebcamConnected = true;
        this.streamVideo();
      }
    },
    streamVideo() {
      this.isLoading = true;
      if (navigator.mediaDevices.getUserMedia) {
        if (this.video.srcObject != null) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              stream.getTracks().forEach((track) => {
                clearInterval(this.interval);
                track.stop();
                this.video.srcObject = null;
              });
            });
        } else {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              this.streamOutput.height = stream
                .getVideoTracks()[0]
                .getSettings().height;
              this.streamOutput.width = stream
                .getVideoTracks()[0]
                .getSettings().width;
              this.video.srcObject = stream;
              this.videoOffscreen.srcObject = stream;
              this.captureMotion(this.videoOffscreen);
            })
            .catch((error) => {
              alert("Something went wrong!", error);
            });
        }
      }
    },
    stopWebcamStream() {
      let tracks = this.video.srcObject.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    },

    captureMotion(stream) {
      stream.onloadeddata = () => {
        if (this.isShowing) {
          this.canvas.resizeCanvas(this.video);
        }
        tf.ready().then(() => {
          console.log("Tensorflow ready.");
          this.interval && clearInterval(this.interval);
          this.interval = setInterval(() => {
            this.captureHandGesture(stream);
          }, 2000);
        });
      };
    },

    async captureHandGesture(stream) {
      const handposeModel = await handpose.load();
      const predictions = await handposeModel.estimateHands(stream);
      this.estimateHandGesture(predictions);
    },

    responseToGesture(gesture, predictions) {
      switch (gesture) {
        case "index_pointing":
          this.detectHandDirection(predictions);
          this.canvas.drawHand(predictions);
          break;
        default:
          break;
      }
    },

    detectHandDirection(predictions) {
      const palmBase = {
        x: predictions[0].annotations.palmBase[0][0],
        y: predictions[0].annotations.palmBase[0][1],
      };

      const indexFinger = {
        x: predictions[0].annotations.indexFinger[3][0],
        y: predictions[0].annotations.indexFinger[3][1],
      };

      const dx = palmBase.x - indexFinger.x;
      const dy = palmBase.y - indexFinger.y;

      console.log(dx, dy);
      switch (true) {
        case dx > -130 && dx < 130 && dy > 80:
          this.estimatedDirection = "up";
          console.log("up");
          this.canvas.direction = `Direction: ${this.estimatedDirection}`;
          this.$root.$refs.StartPage.switchTo(
            this.$root.$refs.StartPage.stage,
            this.estimatedDirection
          );
          break;
        case dy > -130 && dy < 130 && dx > 80:
          console.log("right");
          this.estimatedDirection = "right";
          this.canvas.direction = `Direction: ${this.estimatedDirection}`;
          this.$root.$refs.StartPage.switchTo(
            this.$root.$refs.StartPage.stage,
            this.estimatedDirection
          );
          break;
        case dx > -130 && dx < 130 && dy < -80:
          this.estimatedDirection = "down";
          console.log("down");
          this.canvas.direction = `Direction: ${this.estimatedDirection}`;
          this.$root.$refs.StartPage.switchTo(
            this.$root.$refs.StartPage.stage,
            this.estimatedDirection
          );
          break;
        case dy > -130 && dy < 130 && dx < -130:
          console.log("left");
          this.estimatedDirection = "left";
          this.canvas.direction = `Direction: ${this.estimatedDirection}`;
          this.$root.$refs.StartPage.switchTo(
            this.$root.$refs.StartPage.stage,
            this.estimatedDirection
          );
          break;
        default:
          this.canvas.direction = "No direction estimated.";
          this.estimatedDirection = "";
          break;
      }
    },

    defineHandGestures() {
      const openPalm = new fp.GestureDescription("open_palm");
      openPalm.addCurl(fp.Finger.Thump, fp.FingerCurl.NoCurl, 0.9);
      openPalm.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0.9);
      openPalm.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 0.9);
      openPalm.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 0.9);
      openPalm.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 0.9);

      const halfOpenPalm = new fp.GestureDescription("half_open_palm");
      halfOpenPalm.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 0.7);
      halfOpenPalm.addCurl(fp.Finger.Middle, fp.FingerCurl.HalfCurl, 0.7);
      halfOpenPalm.addCurl(fp.Finger.Ring, fp.FingerCurl.HalfCurl, 0.7);
      halfOpenPalm.addCurl(fp.Finger.Pinky, fp.FingerCurl.HalfCurl, 0.7);

      const indexPointing = new fp.GestureDescription("index_pointing");
      indexPointing.addCurl(fp.Finger.Thump, fp.FingerCurl.HalfCurl, 0.9);
      indexPointing.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 0.9);
      indexPointing.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 0.9);
      indexPointing.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 0.9);
      indexPointing.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 0.9);

      this.GE = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
        openPalm,
        halfOpenPalm,
        indexPointing,
      ]);
    },
    estimateHandGesture(predictions) {
      this.canvas.ctx.clearRect(
        0,
        0,
        this.canvas.cv.width,
        this.canvas.cv.height
      );
      if (predictions.length > 0) {
        const estimatedGestures = this.GE.estimate(
          predictions[0].landmarks,
          8.5
        );
        if (estimatedGestures.gestures.length > 0) {
          this.estimatedGesture = estimatedGestures.gestures[0];
          this.canvas.gesture = `Gesture ${this.estimatedGesture.name}: Confidence of ${this.estimatedGesture.confidence}`;
          this.responseToGesture(this.estimatedGesture.name, predictions);
        }
      } else {
        this.canvas.gesture = "No gesture detected.";
        this.canvas.direction = "No direction estimated.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#webcamCanvas {
  width: 310px;
  height: 250px;
}

#WebCamContainer {
  padding: 0;
}

#WebCamContainer video {
  transform: scaleX(-1);
}
</style>

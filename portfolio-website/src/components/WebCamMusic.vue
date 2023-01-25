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
      dx: "",
      dy: "",
      hx: "",
      hy: "",
      mute: "",
      interval: "",
      streamOutput: {},
      canvas: "",
      video: "",
      gesture: "",
      sounds: "",
      webCamContainer: "",
    };
  },
  created() {
    this.$root.$refs.WebCam = this;
    window.addEventListener("resize", () => {
      this.video.width = this.webCamContainer.offsetWidth;
    });
  },
  mounted() {
    this.canvas = this.$root.$refs.Canvas;
    this.video = this.$root.$refs.VideoBox.$refs.video;
    this.gesture = this.$root.$refs.Canvas.gesture;
    this.sounds = this.$root.$refs.sounds;
    this.defineHandGestures();
    this.webCamContainer = document.getElementById("WebCamContainer");
  },
  methods: {
    toggleWebcam() {
      if (this.isWebcamConnected) {
        this.isWebcamConnected = false;
        this.isWebcamOpen = false;
        this.stopWebcamStream();
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
              this.captureMotion();
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

    captureMotion() {
      this.video.onloadeddata = () => {
        if (this.isShowing) {
          this.canvas.resizeCanvas(this.video);
        }
        tf.ready().then(() => {
          console.log("Tensorflow ready.");
          this.interval && clearInterval(this.interval);
          this.interval = setInterval(() => {
            this.captureHandGesture(this.video);
          }, 2000);
        });
      };
    },

    async captureHandGesture(stream) {
      const handposeModel = await handpose.load();
      const predictions = await handposeModel.estimateHands(stream);
      this.estimateHandGesture(predictions);
    },

    hitDetection(dx, dy, handPositionX, handPositionY, v) {
      if (
        handPositionX >= 0 &&
        handPositionX <= dx &&
        handPositionY >= 0 &&
        handPositionY <= dy
      ) {
        this.playSound(v, 1);
      } else if (
        handPositionX >= dx &&
        handPositionX <= this.canvas.cv.width &&
        handPositionY >= 0 &&
        handPositionY <= dy
      ) {
        console.log("play 2");
        this.playSound(v, 2);
      } else if (
        handPositionX >= 0 &&
        handPositionX <= dx &&
        handPositionY >= dy &&
        handPositionY <= this.canvas.cv.height
      ) {
        console.log("play 3");
        this.playSound(v, 3);
      } else if (
        handPositionX >= dx &&
        handPositionX <= this.canvas.cv.width &&
        handPositionY >= dy &&
        handPositionY <= this.canvas.cv.height
      ) {
        console.log("play 4");
        this.playSound(v, 4);
      }
    },

    playSound(v, ac) {
      const props = new this.createjs.PlayPropsConfig().set({
        interrupt: this.createjs.Sound.INTERRUPT_NONE,
        volume: v,
      });
      switch (ac) {
        case 1: {
          this.createjs.Sound.play(this.sounds[0].id, props);
          this.createjs.Sound.play(this.sounds[1].id, props);
          this.createjs.Sound.play(this.sounds[2].id, props);
          break;
        }
        case 2: {
          this.createjs.Sound.play(this.sounds[1].id, props);
          this.createjs.Sound.play(this.sounds[2].id, props);
          this.createjs.Sound.play(this.sounds[3].id, props);
          break;
        }
        case 3: {
          this.createjs.Sound.play(this.sounds[4].id, props);
          this.createjs.Sound.play(this.sounds[5].id, props);
          this.createjs.Sound.play(this.sounds[0].id, props);
          break;
        }
        case 4: {
          this.createjs.Sound.play(this.sounds[5].id, props);
          this.createjs.Sound.play(this.sounds[0].id, props);
          this.createjs.Sound.play(this.sounds[1].id, props);
          break;
        }
        default: {
          break;
        }
      }
      this.createjs.Sound.play(this.sounds[0].id, props);
      this.createjs.Sound.play(this.sounds[1].id, props);
      this.createjs.Sound.play(this.sounds[2].id, props);
    },

    setVolume(gesture) {
      switch (gesture) {
        case "open_palm":
          return 0.25;
        case "half_open_palm":
          return 0.5;
        case "fist":
          return 0.75;
        default:
          return 0.5;
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

      const fist = new fp.GestureDescription("fist");
      fist.addCurl(fp.Finger.Thump, fp.FingerCurl.HalfCurl, 0.9);
      fist.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 0.9);
      fist.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 0.9);
      fist.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 0.9);
      fist.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 0.9);

      this.GE = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
        openPalm,
        halfOpenPalm,
        fist,
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
        this.canvas.drawHand(predictions);
        const estimatedGestures = this.GE.estimate(
          predictions[0].landmarks,
          8.5
        );
        if (estimatedGestures.gestures.length > 0) {
          this.estimatedGesture = estimatedGestures.gestures[0];
          this.canvas.gesture.innerHTML = `<p>Geste ${this.estimatedGesture.name}: Confidence of ${this.estimatedGesture.confidence}</p>`;
          console.log(
            `Geste ${this.estimatedGesture.name}: Confidence of ${this.estimatedGesture.confidence}`
          );
          if (!this.mute) {
            console.log(this.dx, this.dy, this.canvas.hx, this.canvas.hy);
            this.hitDetection(
              this.dx,
              this.dy,
              this.canvas.hx,
              this.canvas.hy,
              this.setVolume(this.estimatedGesture.name)
            );
            // playSound(setVolume(estimatedGesture.name), 2);
          }
        }
      } else {
        this.canvas.gesture.innerHTML = "<p>Keine Geste erkannt.</p>";
        console.log("Keine Geste erkannt.");
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
</style>

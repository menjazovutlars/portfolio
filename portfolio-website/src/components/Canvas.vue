<template>
  <v-container :style="{ padding: 0 }">
    <div class="info-gesture">
      <div class="estimated-gesture" id="estimated-gesture">
        <p>{{ gesture }}</p>
      </div>
      <div id="estimated-direction" class="justify-end">
        <p>{{ direction }}</p>
      </div>
    </div>

    <canvas id="webcamCanvas" class="canvas"> </canvas>
  </v-container>
</template>

<script>
export default {
  name: "CanvasComp",
  data: function () {
    return {
      cv: "",
      ctx: "",
      webcam: "",
      video: "",
      gesture: "No gesture detected.",
      hx: "",
      hy: "",
      direction: "No direction estimated.",
    };
  },
  created() {
    this.$root.$refs.Canvas = this;
    window.addEventListener("resize", () => {
      this.resizeCanvas(this.video);
    });
  },
  mounted() {
    this.webcam = this.$root.$refs.WebCam;
    this.video = this.$root.$refs.VideoBox.$refs.video;
    this.cv = document.getElementById("webcamCanvas");
    this.ctx = this.cv.getContext("2d");
  },
  methods: {
    resizeCanvas: function (element) {
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      this.cv.width = w;
      this.cv.height = h;
    },
    drawHand(predictions) {
      //   ctx.clearRect(0, 0, cv.width, cv.height);
      const diffWidth = this.video.offsetWidth - this.cv.width;
      const diffHeight = this.video.offsetHeight - this.cv.height;
      const scaleX = this.video.offsetWidth / this.webcam.streamOutput.width;
      const scaleY = this.video.offsetHeight / this.webcam.streamOutput.height;
      this.webcam.dx = this.cv.width / 2;
      this.webcam.dy = this.cv.height / 2;
      if (predictions.length > 0) {
        predictions.forEach((prediction) => {
          const landmarks = prediction.landmarks;
          this.hx = landmarks[0][0] * scaleX - diffWidth;
          this.hy = landmarks[0][1] * scaleY - diffHeight;
          for (let i = 0; i < landmarks.length; i++) {
            const x = landmarks[i][0] * scaleX - diffWidth;
            const y = landmarks[i][1] * scaleY - diffHeight;

            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 3 * Math.PI);

            this.ctx.fillStyle = "#71C6E0";
            this.ctx.fill();
          }
          for (
            let j = 0;
            j < Object.keys(this.webcam.fingerJoints).length;
            j++
          ) {
            const finger = Object.keys(this.webcam.fingerJoints)[j];
            //  Loop through pairs of joints
            for (
              let k = 0;
              k < this.webcam.fingerJoints[finger].length - 1;
              k++
            ) {
              // Get pairs of joints
              const firstJointIndex = this.webcam.fingerJoints[finger][k];
              const secondJointIndex = this.webcam.fingerJoints[finger][k + 1];

              // Draw path
              this.ctx.beginPath();
              this.ctx.moveTo(
                landmarks[firstJointIndex][0] * scaleX - diffWidth,
                landmarks[firstJointIndex][1] * scaleY - diffHeight
              );
              this.ctx.lineTo(
                landmarks[secondJointIndex][0] * scaleX - diffWidth,
                landmarks[secondJointIndex][1] * scaleY - diffHeight
              );
              this.ctx.strokeStyle = "#71C6E0";
              this.ctx.lineWidth = 4;
              this.ctx.stroke();
            }
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  z-index: 15;
  flex-grow: 0;
  flex-shrink: 4;
  flex-basis: 50vw;
  object-fit: cover;
  transform: scaleX(-1);
}

.info-gesture {
  margin: unset;
  width: 100%;
}
</style>

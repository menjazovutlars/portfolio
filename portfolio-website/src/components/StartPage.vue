<template lang="">
  <v-app>
    <v-container
      d-flex
      justify
      center
      fluid
      fill-height
      id="stage-container"
      class="stage-container"
    >
      <v-component
        id="stage"
        v-bind:is="stage"
        :class="[
          stageClass,
          stageInvisible ? 'invisible' : '',
          toRight ? 'to-right' : '',
        ]"
      ></v-component>
      <CanvasBackground class="canvas-bg-container"></CanvasBackground>
    </v-container>
  </v-app>
</template>

<script>
import ProjectPageCenter from "./projectpages/Center/ProjectPageCenter.vue";
import ProjectPageDown from "./projectpages/Down/ProjectPageDown.vue";
import ProjectPageLeft from "./projectpages/Left/ProjectPageLeft.vue";
import ProjectPageRight from "./projectpages/Right/ProjectPageRight.vue";
import ProjectPageUp from "./projectpages/Up/ProjectPageUp.vue";
import AboutTrack from "./projectpages/Up/AboutTrack.vue";
import TrailerTrack from "./projectpages/Up/TrailerTack.vue";
import CanvasBackground from "./CanvasBackground.vue";

import gsap from "gsap";

export default {
  name: "StartPage",
  components: {
    ProjectPageCenter,
    ProjectPageDown,
    ProjectPageLeft,
    ProjectPageRight,
    ProjectPageUp,
    CanvasBackground,
    AboutTrack,
    TrailerTrack,
  },
  data() {
    return {
      stage: "ProjectPageCenter",
      colsContBox: {
        col6: true,
      },
      colsTextBox: {
        col6: true,
      },
      pPCenter: ProjectPageCenter,
      pPUp: ProjectPageUp,
      pPUpAboutTrack: AboutTrack,
      pPUpTrailerTrack: TrailerTrack,
      pPRight: ProjectPageRight,
      pPDown: ProjectPageDown,
      pPLeft: ProjectPageLeft,
      stageClass: "stage",
      stageInvisible: false,
      toRight: false,
      stageComponent: "",
    };
  },
  created() {
    this.$root.$refs.StartPage = this;
  },
  mounted() {
    this.stageComponent = document.getElementById("stage");
  },
  methods: {
    moveRight: function () {
      const duration = 3;
      gsap.fromTo(
        this.stageComponent,
        {
          maxWidth: "50",
        },
        {
          marginRight: 0,
          padding: "12px",
          maxWidth: "100",
          duration: duration,
          ease: "sine.inOut",
        }
      );
      setTimeout(() => {
        this.$root.$refs.StartPage.toRight = true;
      }, duration * 1000);
    },
    switchTo(name, direction) {
      console.log(name, direction);
      console.log(this.stage);
      const canvasBG = this.$root.$refs.CanvasBG;
      const canvasBGScene = this.$root.$refs.CanvasBG.scene;
      let offset;

      switch (name) {
        case "ProjectPageCenter":
          switch (true) {
            case direction === "up" && canvasBG.inView.up:
              offset = {
                x: 0.0116,
                y: 5.6171,
                z: -62.3963,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPUp.data().room).position,
                offset,
                this.pPUp.data().room,
                "ProjectPageUp"
              );

              break;
            case direction === "right" && canvasBG.inView.right:
              offset = {
                x: 43.4376,
                y: 10.6262,
                z: 0.1676,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPRight.data().room)
                  .position,
                offset,
                this.pPRight.data().room,
                "ProjectPageRight"
              );

              break;
            case direction === "left" && canvasBG.inView.left:
              offset = {
                x: -43.4376,
                y: 10.6262,
                z: -0.1676,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPLeft.data().room).position,
                offset,
                this.pPLeft.data().room,
                "ProjectPageLeft"
              );

              break;
            case direction === "down" && canvasBG.inView.down:
              offset = {
                x: -0.59716,
                y: 6.2247,
                z: 62.4918,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPDown.data().room).position,
                offset,
                this.pPDown.data().room,
                "ProjectPageDown"
              );

              break;
            default:
              break;
          }
          break;
        case "ProjectPageDown":
          switch (true) {
            case direction === "up" && canvasBG.inView.up:
              offset = {
                x: 0.0816,
                y: 5.9039,
                z: 38.0365,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPCenter.data().room)
                  .position,
                offset,
                this.pPCenter.data().room,
                "ProjectPageCenter"
              );

              if (canvasBG.videoCubeVisible) {
                canvasBG.placeVideoCubeOnSocket();
              }
              if (canvasBG.videoCube.userData.streaming) {
                canvasBG.updateVideoTexture();
              }

              break;
            default:
              break;
          }
          break;
        case "ProjectPageLeft":
          switch (true) {
            case direction === "right" && canvasBG.inView.right:
              offset = {
                x: -38.9981,
                y: 8.5884,
                z: -0.1939,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPCenter.data().room)
                  .position,
                offset,
                this.pPCenter.data().room,
                "ProjectPageCenter"
              );

              if (canvasBG.videoCubeVisible) {
                canvasBG.placeVideoCubeOnSocket();
              }
              if (canvasBG.videoCube.userData.streaming) {
                canvasBG.updateVideoTexture();
              }

              break;
            default:
              break;
          }
          break;
        case "ProjectPageRight":
          switch (true) {
            case direction === "left" && canvasBG.inView.left:
              offset = {
                x: 38.6803,
                y: 10.1896,
                z: -0.0668,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPCenter.data().room)
                  .position,
                offset,
                this.pPCenter.data().room,
                "ProjectPageCenter"
              );

              if (canvasBG.videoCubeVisible) {
                canvasBG.placeVideoCubeOnSocket();
              }
              if (canvasBG.videoCube.userData.streaming) {
                canvasBG.updateVideoTexture();
              }

              break;
            default:
              break;
          }
          break;
        case "ProjectPageUp":
          switch (true) {
            case direction === "down" && canvasBG.inView.down:
              offset = {
                x: 0.1973,
                y: 5.5323,
                z: -38.092,
              };

              canvasBG.moveToRoom(
                canvasBGScene.getObjectByName(this.pPCenter.data().room)
                  .position,
                offset,
                this.pPCenter.data().room,
                "ProjectPageCenter"
              );

              if (canvasBG.videoCubeVisible) {
                canvasBG.placeVideoCubeOnSocket();
              }
              if (canvasBG.videoCube.userData.streaming) {
                canvasBG.updateVideoTexture();
              }

              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
<style scoped>
.stage {
  max-width: 50%;
  padding: 24px;
  position: relative;
  z-index: 2;
}

.to-right {
  max-width: 50% !important;
  margin-right: 0;
}

.invisible {
  display: none !important;
}

.canvas-bg-container {
  width: 50vw;
  padding: 0;
}
</style>

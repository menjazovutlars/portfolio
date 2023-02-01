<template lang="">
  <v-app>
    <v-container d-flex justify center fluid fill-height>
      <CanvasBackground></CanvasBackground>
      <v-component id="stage" v-bind:is="stage"></v-component>
    </v-container>
  </v-app>
</template>

<script>
import ProjectPageCenter from "./projectpages/ProjectPageCenter.vue";
import ProjectPageDown from "./projectpages/ProjectPageDown.vue";
import ProjectPageLeft from "./projectpages/ProjectPageLeft.vue";
import ProjectPageRight from "./projectpages/ProjectPageRight.vue";
import ProjectPageUp from "./projectpages/ProjectPageUp.vue";
import CanvasBackground from "./CanvasBackground.vue";

export default {
  name: "StartPage",
  components: {
    ProjectPageCenter,
    ProjectPageDown,
    ProjectPageLeft,
    ProjectPageRight,
    ProjectPageUp,
    CanvasBackground,
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
    };
  },
  created() {
    this.$root.$refs.StartPage = this;
  },
  methods: {
    switchTo(name, direction) {
      console.log(name, direction);
      console.log(this.stage);
      switch (name) {
        case "ProjectPageCenter":
          switch (direction) {
            case "up":
              this.stage = "ProjectPageUp";
              break;
            case "right":
              this.stage = "ProjectPageRight";
              break;
            case "left":
              this.stage = "ProjectPageLeft";
              break;
            case "down":
              this.stage = "ProjectPageDown";
              break;
            default:
              break;
          }
          break;
        case "ProjectPageDown":
          switch (direction) {
            case "up":
              this.stage = "ProjectPageCenter";
              break;
            default:
              break;
          }
          break;
        case "ProjectPageLeft":
          switch (direction) {
            case "right":
              this.stage = "ProjectPageCenter";
              break;
            default:
              break;
          }
          break;
        case "ProjectPageRight":
          switch (direction) {
            case "left":
              this.stage = "ProjectPageCenter";
              break;
            default:
              break;
          }
          break;
        case "ProjectPageUp":
          switch (direction) {
            case "down":
              console.log("me here");
              this.stage = "ProjectPageCenter";
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
#stage {
  max-width: 70%;
  padding: 0;
}
</style>

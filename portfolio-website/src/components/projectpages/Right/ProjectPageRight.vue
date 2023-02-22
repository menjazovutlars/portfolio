<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row no-gutters justify="center" class="in-front content">
      <v-col id="content-col">
        <h1>Welche Internet-Persönlichkeit hast du?</h1>

        <p>
          Als interaktive Simulation zeigt Social Whispers anschaulich, wie sich
          Informationen in sozialen Medien verbreiten.
        </p>

        <v-row no-gutters>
          <v-col
            :class="[col12 ? 'col-12' : 'col-6']"
            :order="[col12 ? '3' : '1']"
          >
            <h2>Das Ziel</h2>
            <p>
              In Krisenzeiten, wie der anhaltenden COVID-19-Pandemie, wird die
              maßgebliche Rolle von sozialen Netzwerken verdeutlicht – gerade
              wenn es um Kommunikation und Informationen geht. Dabei hat nicht
              jede*r Nutzende Gutes im Sinn.
            </p>
            <p>
              Mit diesem Projekt sollte auf diese Problematik aufmerksam gemacht
              werden und Nutzende dazu anregen, reflektiert und kritisch mit
              Inhalten auf Social Media umzugehen. »Social Whispers« sollte
              damit eine Basis für das zukünftige eigene Handeln in den sozialen
              Medien schaffen.
            </p>
          </v-col>
          <v-col
            :class="[col12 ? 'col-1' : 'col-1']"
            :order="[col12 ? '2' : '2']"
          ></v-col>
          <v-col
            :class="[col12 ? 'col-12' : 'col-5']"
            :order="[col12 ? '1' : '3']"
          >
            <v-img src="@/assets/social-whispers-newsanchor.webp"> </v-img>
            <v-row no-gutters class="img-label">
              Nachrichtensprecher informiert über Hamsterkäufe.
            </v-row>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col
            :class="[col12 ? 'col-12' : 'col-6']"
            :order="[col12 ? '1' : '3']"
          >
            <h2>Die Umsetzung</h2>
            <p>
              In unserer Simulation schlüpfen Nutzende in die Rolle einer
              Person, die ihr Gedächtnis verloren hat. Auf der Suche nach ihrer
              Identität erkunden sie die Welt von »Social Whispers« und
              hinterlassen dabei ihre Spuren.
            </p>
            <p>
              Jede Entscheidung hat Folgen, die sich im Lauf der Simulation
              bemerkbar machen. Am Ende erfahren die Nutzenden, welche
              Internetpersönlichkeit sie dabei verkörpern.
            </p>
          </v-col>
          <v-col
            :class="[col12 ? 'col-1' : 'col-1']"
            :order="[col12 ? '2' : '2']"
          ></v-col>
          <v-col
            :class="[col12 ? 'col-12' : 'col-5']"
            :order="[col12 ? '3' : '1']"
          >
            <v-img src="@/assets/social-whispers-demo.webp"> </v-img>
            <v-row no-gutters class="img-label">
              Demo und Gegendemo vor einer Bar.
            </v-row>
          </v-col>
        </v-row>

        <h2>Trailer</h2>

        <p>
          <video
            src="@/assets/videos/trailer_social-whispers.mp4"
            poster="@/assets/videos/thumbnail_social-whispers.jpg"
            :width="width"
            :height="height"
            controls
            id="trailer_social-whispers"
          ></video>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "ProjectPageRight",
  data() {
    return {
      room: "Social Whispers",
      width: "",
      height: "",
      col12: false,
      breakpoint: 1600,
    };
  },
  created() {
    this.$root.$refs.ProjectPageRight = this;
  },
  mounted() {
    this.resizeIFrame();

    addEventListener("resize", () => {
      this.resizeIFrame;

      if (window.innerWidth < this.breakpoint) {
        this.col12 = true;
      } else {
        this.col12 = false;
      }

      console.log(window.innerWidth);

      console.log(this.col12);
    });
  },
  methods: {
    resizeIFrame: function () {
      const col = document.getElementById("content-col"),
        width = col.offsetWidth,
        ratio = 360 / 640,
        height = width * ratio;

      console.log(width, height, ratio);

      this.width = width;
      this.height = height;
    },
  },
};
</script>

<style lang="scss" scoped>
.in-front {
  z-index: 1000;
}

.top-row {
  align-items: center !important;
  margin-bottom: 50vh;
}

.stage-container {
  padding: 0;
}
</style>

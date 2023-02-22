<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row no-gutters justify="center" class="in-front content">
      <v-col id="content-col">
        <h1>Denkblockaden.</h1>
        <p>
          Jede:r Kreativschaffende kennt und fürchtet sie. Insbesondere wenn man
          im Beruf auf seine Kreativität angewiesen ist, kann eine kreative
          Blockade zum großen Problem werden. Aufträge stauen sich, Kund:innen
          müssen warten, der Stresspegel steigt …. Je verkrampfter man dann
          versucht, trotz der Denkblockade weiter zu arbeiten, desto schlimmer
          wird es. Bis man für den Tag verzweifelt aufgibt. Durch die Covid-19
          Pandemie wurde dieses Problem noch verstärkt, denn der Austausch mit
          Gleichgesinnten wurde deutlich erschwert.
        </p>

        <h2>Was kann helfen?</h2>

        <p>
          Das kreative Denken wird von vielen verschiedenen Faktoren
          beeinflusst, insbesondere auch durch unsere Stimmung. Unsere Stimmung
          kann wiederum durch Musik verändert werden. Recherchen haben ergeben,
          dass aktives Musizieren insbesondere in Kombination mit Bewegung
          unsere Stimmung aktiv so verändern kann, dass das kreative Denken
          gefördert wird. Hier setzt Motic an.
        </p>
        <p>
          Viele Menschen würden die Vorteile des Musizierens gerne nutzen,
          können oder wollen allerdings kein Instrument lernen. Für diese
          Menschen bietet Motic eine Möglichkeit, ohne Vorkenntnisse und mit
          möglichst wenig Regeln die Vorteile des Musizierens zu entdecken und
          dabei spielerisch mit anderen kreativen Menschen zusammen zu arbeiten.
        </p>

        <h2>Die Lösung!</h2>

        <p>
          Motic ist ein Medium, welches Handbewegungen erkennt und in Töne
          umwandelt. Es funktioniert dabei mit mehr als zwei Händen, damit
          mehrere Personen über Motic in eine Interaktion miteinander treten
          können. Sie müssen sich zusammen bewegen, um eine harmonische Melodie
          zu erzeugen. Durch Motic brauchen sie darüber hinaus allerdings
          keinerlei Kenntnisse im Musizieren zu haben. Weiterhin wird durch die
          alleinige Nutzung der Hände ebenfalls gesichert, dass nicht zu viele
          Regeln erlernt werden müssen.
        </p>
        <p>
          So können zum Beispiel über die Position der Hand unterschiedliche
          Töne abgespielt werden. Die Gesten Faust, halboffene Handfläche und
          offene Handfläche bestimmen dabei die Lautstärke des Tons mit der
          Faust für laut und offene Handfläche für leise.
        </p>
        <p>
          Motic eröffnet einer breiten Gruppe an Menschen die Vorteile des
          Musizierens. Durch die Kombination aus Bewegung und Musik wird das
          kreative Denken gefördert, Denkblockaden können aufgelöst und das
          Gemeinschaftsgefühl zwischen Kreativschaffenden gefördert werden.
        </p>
        <h2>Trailer</h2>

        <p>
          <video
            id="trailer_motic"
            :width="width"
            :height="height"
            controls
            src="@/assets/videos/trailer_motic.mp4"
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
  name: "ProjectPageDown",
  data() {
    return {
      room: "Motic",
      width: "",
      height: "",
    };
  },
  created() {
    this.$root.$refs.ProjectPageDown = this;
  },
  mounted() {
    this.resizeVideo();

    addEventListener("resize", () => {
      this.resizeVideo;
    });
  },
  methods: {
    resizeVideo: function () {
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
</style>

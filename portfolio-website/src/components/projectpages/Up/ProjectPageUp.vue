<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row no-gutters justify="center" class="in-front content">
      <v-col>
        <h1>Hi, ich bin TRACK!</h1>
        <v-row class="citation-row">
          <v-col cols="1" d-flex>
            <p class="citation">„</p>
          </v-col>
          <v-col cols="11">
            <p>
              Ich verbessere das Wandererlebnis von Wandervereinen und
              Wandernden, in dem ich als Schnittstelle von beiden dienen und
              Informationen zur Umgebung einer Region als Audioguide zur
              Verfügung stelle.
            </p>
          </v-col>
        </v-row>
        <h2>Unterwegs in der Natur</h2>

        <p>
          Menschen sind in der Natur unterwegs, um zu entspannen, die Gegend zu
          erkunden oder ihrer Gesundheit willen. Wenn Menschen in der Natur
          unterwegs sind, gehen viele wandern. Laufen vorgegebene Routen
          entlang, eventuell fahren sie auch 20km weiter raus, um eine Burg zu
          betrachten und spazieren zu gehen. Wenn sie vor der Burg stehen,
          können sie Infotafeln durchlesen, sich über die Burg informieren. Doch
          was passiert, wenn viele diese Idee haben? Zehn Menschen stehen vor
          einem und wollen das gleiche wie man selbst: sich informieren. Aber
          wer hat Lust zu warten? Wer möchte sich erstmal erkundigen wie genau
          die Burg vor einem heißt, den passenden Artikel darüber heraussuchen
          und die ganze Zeit auf sein Smartphone schauen? Nicht viele. Was wäre,
          wenn die Infotafel direkt ersichtlich ist? Oder sie nicht vollständig
          lesbar durch Vandalismus, Verwitterung oder erst gar nicht vorhanden
          ist? Genau das ist das Problem.
        </p>

        <h2>Der Prototyp</h2>

        <v-img src="@/assets/track-screen.webp"> </v-img>

        <p>
          In erster Linie lag der Fokus bei diesem Projekt auf der Hauptfunktion
          der Applikation. Hierfür wurde eine Wanderroute ausgesucht, die
          kontinuierlich auf dem Bildschirm angezeigt wird. Die eigenen
          GPS-Koordinaten werden kontinuirlich abgefragt und mit einer Datenbank
          abgeglichen. Sobald eine Sehenswürdigkeiten-Koordinate mit der eigenen
          übereinstimmt , wird eine Audiodatei abgespielt, die über die aktuelle
          Sehenswürdigkeit Informationen wiedergibt. Diese Informationen sind
          auch visuell einsehbar.
        </p>
        <h2>Trailer</h2>

        <p>
          <iframe
            src="https://player.vimeo.com/video/513146351?h=4205110b8f"
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
            id="iframe_trailerTrack"
          ></iframe>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "ProjectPageUp",
  data() {
    return {
      room: "Project 1",
    };
  },
  created() {
    this.$root.$refs.ProjectPageUp = this;
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <v-container fill-height fluid d-flex justify center>
    <v-row justify="center" class="in-front top-row">
      <v-col>
        <h1>Unterwegs in der Natur</h1>
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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
          asperiores, ex modi explicabo maxime eligendi suscipit architecto
          fugiat blanditiis similique quisquam laboriosam sunt nam voluptatem
          fugit fuga, labore qui alias. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quos, asperiores, ex modi explicabo maxime eligendi
          suscipit architecto fugiat blanditiis similique quisquam laboriosam
          sunt nam voluptatem fugit fuga, labore qui alias.Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quos, asperiores, ex modi explicabo
          maxime eligendi suscipit architecto fugiat blanditiis similique
          quisquam laboriosam sunt nam voluptatem fugit fuga, labore qui
          alias.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
          asperiores, ex modi explicabo maxime eligendi suscipit architecto
          fugiat blanditiis similique quisquam laboriosam sunt nam voluptatem
          fugit fuga, labore qui alias.Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quos, asperiores, ex modi explicabo maxime eligendi
          suscipit architecto fugiat blanditiis similique quisquam laboriosam
          sunt nam voluptatem fugit fuga, labore qui alias.
        </p>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StartPage from "@/components/StartPage.vue";

export default {
  extends: StartPage,
  name: "AboutTrack",
  data() {
    return {};
  },
  created() {
    this.$root.$refs.AboutTrack = this;
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
  max-height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.top-row::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

.top-row::-webkit-scrollbar {
  width: 12px;
  background-color: transparent;
}

.top-row::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #8fe1f2;
}
</style>

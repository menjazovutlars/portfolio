<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
const C5 = require("./assets/sounds/C5.wav");
const E5 = require("./assets/sounds/E5.wav");
const G5 = require("./assets/sounds/G5.wav");
const H5 = require("./assets/sounds/H5.wav");
const F4 = require("./assets/sounds/F4.wav");
const A4 = require("./assets/sounds/A4.wav");
export default {
  name: "App",

  data: () => ({
    //
    sounds: [],
  }),
  created() {
    this.$root.$refs.sounds = this.sounds;
  },
  mounted() {
    const c5 = this.createjs.Sound.registerSound(C5, "C5");
    this.sounds.push(c5);
    const e5 = this.createjs.Sound.registerSound(E5, "E5");
    this.sounds.push(e5);
    const g5 = this.createjs.Sound.registerSound(G5, "G5");
    this.sounds.push(g5);
    const h5 = this.createjs.Sound.registerSound(H5, "H5");
    this.sounds.push(h5);
    const f4 = this.createjs.Sound.registerSound(F4, "F4");
    this.sounds.push(f4);
    const a4 = this.createjs.Sound.registerSound(A4, "A4");
    this.sounds.push(a4);
  },
};
</script>

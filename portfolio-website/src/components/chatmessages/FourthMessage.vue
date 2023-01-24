<template>
  <v-container>
    <p class="black--text text-h5 intro__subtitle">
      Do you have a webcam connected?
    </p>
    <v-container d-flex justify-space-around v-bind:style="{ padding: 0 }">
      <v-btn color="green">Yes, I have.</v-btn
      ><v-btn color="red">No, I haven't.</v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "FourthMessage",
};
</script>

<style lang="scss" scoped></style>

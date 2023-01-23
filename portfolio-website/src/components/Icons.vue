<template>
  <v-icon color="black" size="200" class="icon__intro waving-hand" x- large>
    {{ icon }}</v-icon
  >
</template>

<script>
export default {
  name: "IconBox",
  props: ["icon"],
  data() {
    return {};
  },
  mounted: function () {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>

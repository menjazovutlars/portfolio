<template>
  <v-container fluid full-height>
    <v-row>
      <v-col> </v-col>
      <v-col
        :class="[
          mapRoom,
          currentRoom === 'ProjectPageUp' ? 'current-room' : '',
        ]"
      >
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col
        :class="[
          mapRoom,
          currentRoom === 'ProjectPageLeft' ? 'current-room' : '',
        ]"
      >
      </v-col>
      <v-col
        :class="[
          mapRoom,
          currentRoom === 'ProjectPageCenter' ? 'current-room' : '',
        ]"
      >
      </v-col>
      <v-col
        :class="[
          mapRoom,
          currentRoom === 'ProjectPageRight' ? 'current-room' : '',
        ]"
      >
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
      <v-col
        :class="[
          mapRoom,
          currentRoom === 'ProjectPageDown' ? 'current-room' : '',
        ]"
      >
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MiniMap",
  data() {
    return {
      currentRoom: "ProjectPageCenter",
      mapRoom: "map-room",
    };
  },
  created() {
    this.$root.$refs.MiniMap = this;
  },
  mounted() {
    //this.updateMap();
  },
  methods: {
    updateMap: function () {
      //this.currentRoom = this.$root.$refs.CanvasBG.currentRoom.name;
      console.log(this.currentRoom);

      requestAnimationFrame(this.updateMap);
    },
  },
};
</script>

<style lang="scss" scoped>
.col {
  margin: 10px;

  z-index: 10000;
  height: 100px;
  width: 100px;
}

.row {
  margin: 0px;
}

.map-room {
  background-color: white;
  box-shadow: 1px 1px 10px 0.3px #efece8;
}

.current-room {
  background-color: blueviolet;
}
</style>

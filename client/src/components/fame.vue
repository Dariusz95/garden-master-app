<template>
  <div class="fame-container">
    <ul class="famePlant-list">
      <li v-for="(plant, index) in sortPlants" :key="plant._id">
        <fameCard :plant="plant" :index="index" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import fameCard from "./fameCard.vue";
export default {
  components: { fameCard },
  name: "fame",
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters({ plants: "getPlants" }),
    sortPlants() {
      return this.plants.sort((a, b) => b.like.length - a.like.length);
    },
  },
  methods: {
    ...mapActions(["fetchPlants"]),
  },
  async created() {
    await this.fetchPlants();
  },
};
</script>
<style lang="scss" scoped>
.fame-container {
  margin-top: 170px;
  display: flex;
  // min-height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
}
.famePlant-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
  margin: 0;
  padding: 0;
}
li {
  font-size: 2rem;
  list-style: none;
  flex-basis: calc(25% - 30px);
  margin: 15px;
}
li:nth-child(1),
li:nth-child(2),
li:nth-child(3) {
  flex-basis: calc(33% - 30px);
  border-radius: 45px;
  height: 250px;
}
li:nth-child(1) > .card > .card-place {
  background: red;
}

li:nth-child(1) {
  border: 9px solid gold;
}

li:nth-child(2) {
  border: 9px solid silver;
}
li:nth-child(3) {
  border: 9px solid #ec855c;
}
</style>

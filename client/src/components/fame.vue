<template>
  <div class="fame-container">
    <ul>
      <li v-for="plant in sortPlants" :key="plant._id">
        <fameCard :plant="plant" />
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
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
ul {
  display: flex;
  flex-direction: column;
}
li {
  font-size: 2rem;
  list-style: none;
}
</style>

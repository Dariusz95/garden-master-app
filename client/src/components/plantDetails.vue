<template>
  <div class="details">
    {{ plant.kind }} {{ plant.type }} {{ plant.tips }} {{ plant.owner.login }}
    <span>Komentarze : {{ plant.comments[0].comment }}</span>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "plantDetails",
  data() {
    return {
      plant: "",
    };
  },
  computed: {
    plantId() {
      return this.$route.params.id;
    },
  },
  async created() {
    await axios
      .get(`http://localhost:3000/api/plant/${this.plantId}`)
      .then((res) => {
        console.log(res.data);
        this.plant = res.data;
      });
  },
};
</script>
<style lang="scss">
.details {
  position: relative;
  top: 60px;
}
</style>

<template>
  <div class="details">
    {{ plant.kind }} {{ plant.type }} {{ plant.tips }} {{ plant.owner.login }}

    <span v-if="plant.comments.length"
      >Komentarze : {{ plant.comments[0].comment }}</span
    >
  </div>
</template>
<script>
import API_URL from "../../api";
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
    await axios.get(`${API_URL}/plant/${this.plantId}`).then((res) => {
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
